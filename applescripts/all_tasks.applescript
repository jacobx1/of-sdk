#!/usr/bin/osascript

use AppleScript version "2.4" -- Yosemite (10.10) or later
use framework "Foundation"
use scripting additions

-- classes, constants, and enums used
property NSJSONWritingPrettyPrinted : a reference to 0
property NSJSONSerialization : a reference to current application's NSJSONSerialization
property NSString : a reference to current application's NSString

on rfc3339FromDate(aDate)
	set theFormatter to current application's NSDateFormatter's new()
	theFormatter's setLocale:(current application's NSLocale's localeWithLocaleIdentifier:"en_US_POSIX")
	theFormatter's setTimeZone:(current application's NSTimeZone's timeZoneWithAbbreviation:"GMT") -- skip for local time
	theFormatter's setDateFormat:"yyyy'-'MM'-'dd'T'HH':'mm':'ssXXX"
	return (theFormatter's stringFromDate:aDate)
end rfc3339FromDate

on toJSON(obj)
	set theJSONData to NSJSONSerialization's dataWithJSONObject:obj options:NSJSONWritingPrettyPrinted |error|:(missing value)
	set someString to current application's NSString's alloc()'s initWithData:theJSONData encoding:(current application's NSUTF8StringEncoding)
	return someString as text
end toJSON

on actionItemPropertiesToSet(properties)
	tell application "OmniFocus"
		set currentId to id of properties
		set currentName to name of properties
		set currentDueDate to my rfc3339FromDate(due date of properties)
		set deferDate to my rfc3339FromDate(defer date of properties)
		set completionDate to my rfc3339FromDate(completion date of properties)
		set currentNote to note of properties
		set currentFlagged to flagged of properties
		set modificationDate to my rfc3339FromDate(modification date of properties)
		set estimatedMinutes to estimated minutes of properties
		set isCompleted to completed of properties
		set isDropped to dropped of properties
		return {|id|:currentId, |name|:currentName, |dueDate|:currentDueDate, |deferDate|:deferDate, |completionDate|:completionDate, |note|:currentNote, |flagged|:currentFlagged, |modificationDate|:modificationDate, |estimatedMinutes|:estimatedMinutes, |completed|:isCompleted, |dropped|:isDropped}
	end tell
end actionItemPropertiesToSet

on getExtendedProperties(index, allTags, allParents)
	set currentTagIds to item index of item index 1 of allTags
	set currentTagNames to item index of item index 2 of allTags
	set currentParentId to item index of item index 1 of allParents
	set currentParentName to item index of item index 2 of allParents
	
	set allTagsKeyed to {}
	repeat with index2 from 1 to length of currentTagIds
		set currentTagId to item index2 of currentTagIds
		set currentTagName to item index2 of currentTagNames
		set end of allTagsKeyed to {|id|:currentTagId, |name|:currentTagName}
	end repeat
	
	set parentItem to {|id|:currentParentId, |name|:currentParentName}
	
	return {|parent|:parentItem, tags:allTagsKeyed}
end getExtendedProperties

on getTasksForIterator(iterator, includeExtendedData)
	tell application "OmniFocus"
		set allProperties to get the properties of iterator
		
		if includeExtendedData then
			set allTags to {id, name} of tags of iterator
			set allParents to {id, name} of parent task of iterator
		end if
		
		set output to {}
		repeat with index from 1 to length of allProperties
			set propertiesValue to item index of allProperties
			set basicProperties to my actionItemPropertiesToSet(propertiesValue)
			
			if includeExtendedData then
				set extendedProperties to my getExtendedProperties(index, allTags, allParents)
				set end of output to basicProperties & extendedProperties
			else
				set end of output to basicProperties
			end if
		end repeat
		return output
	end tell
end getTasksForIterator

on parseArgv(thisArgv)
	set containerParam to false
	set shouldGetExtendedProperties to false
	set commandType to "tasks"
	set filterType to "remaining"
	try
		set commandType to item 1 of thisArgv -- "tasks", "projects"
		set filterType to item 2 of thisArgv -- "all", "remaining", "closed", "dropped", "completed"
		set shouldGetExtendedProperties to item 3 of thisArgv as boolean
		
		if length of thisArgv > 3 then
			-- For tasks, this is the containing project. For projects, this is the containing folder, or, can not include
			set containerParam to item 4 of thisArgv
		end if
	end try
	return {command:commandType, filter:filterType, container:containerParam, shouldGetExtendedProperties:shouldGetExtendedProperties}
end parseArgv

on getBaseIteratorForArgs(args)
	tell application "OmniFocus" to tell default document
		set filterContainer to |container| of args
		if (command of args) is "tasks" then
			if filterContainer is false then
				return a reference to (every flattened task)
			end if
			return a reference to (every flattened task of root task of (first project whose id is filterContainer))
		else if (command of args) is "projects" then
			if filterContainer is false then
				return a reference to (root task of every flattened project)
			end if
			return a reference to ((root task of every flattened project) of (first folder whose id is filterContainer))
		end if
	end tell
end getBaseIteratorForArgs

on getFilteredIteratorForArgs(args, baseIterator)
	tell application "OmniFocus" to tell default document
		set iterator to baseIterator
		if (filter of args) is "remaining" then
			set iterator to a reference to (baseIterator whose completed is false and dropped is false)
		else if (filter of args) is "closed" then
			set iterator to a reference to (baseIterator whose completed is true or dropped is true)
		else if (filter of args) is "dropped" then
			set iterator to a reference to (baseIterator whose dropped is true)
		else if (filter of args) is "completed" then
			set iterator to a reference to (baseIterator whose completed is true)
		end if
		
		return iterator
	end tell
end getFilteredIteratorForArgs

on handleTasksAndProjects(args)
	set baseIterator to my getBaseIteratorForArgs(args)
	set iterator to my getFilteredIteratorForArgs(args, baseIterator)
	return my getTasksForIterator(iterator, shouldGetExtendedProperties of args)
end handleTasksAndProjects

on run argv
	tell application "OmniFocus"
		tell default document
			set args to my parseArgv(argv)
			set output to my handleTasksAndProjects(args)
			return my toJSON(output)
		end tell
	end tell
end run

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

on run argv
  tell application "OmniFocus"
    tell document window 1 of default document of application "OmniFocus"
      set perspective name to item 1 of argv
      set values to get the properties of value of leaves of content
      set output to {}
      repeat with value in values
        set end of output to my actionItemPropertiesToSet(value)
      end repeat
      return my toJSON(output)
    end tell
  end tell
end run

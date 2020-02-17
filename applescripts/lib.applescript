-- classes, constants, and enums used
property NSJSONWritingPrettyPrinted : a reference to 0
property NSJSONSerialization : a reference to current application's NSJSONSerialization
property NSString : a reference to current application's NSString

on toJSON(obj)
	set theJSONData to NSJSONSerialization's dataWithJSONObject:obj options:NSJSONWritingPrettyPrinted |error|:(missing value)
	set someString to current application's NSString's alloc()'s initWithData:theJSONData encoding:(current application's NSUTF8StringEncoding)
	return someString as text
end toJSON

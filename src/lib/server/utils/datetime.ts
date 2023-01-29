/**
 * 
 * @param date Input date
 * @param format Format string (e.g. "yyyy-MM-dd hh:mm:ss.SSS")
 * @returns Formatted date string
 */
export function format(date: Date, format: string): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();
    
    let buffer=null;
    for (let i = 0; i < format.length; i++) {
        const char = format[i];
        if (buffer === null) {
            buffer = char;
            continue;
        }
        if (buffer === char) {
            buffer += char;
            if (i !== format.length - 1)
                continue;
        }

        switch (buffer[0]) {
            case "y":
                format = format.replace(buffer, formatNumber(year, buffer.length, [2, 4]));
                break;
            case "M":
                format = format.replace(buffer, formatNumber(month, buffer.length, [1, 2]));
                break;
            case "d":
                format = format.replace(buffer, formatNumber(day, buffer.length, [1, 2]));
                break;
            case "h":
                format = format.replace(buffer, formatNumber(hours, buffer.length, [1, 2]));
                break;
            case "m":
                format = format.replace(buffer, formatNumber(minutes, buffer.length, [1, 2]));
                break;
            case "s":
                format = format.replace(buffer, formatNumber(seconds, buffer.length, [1, 2]));
                break;
            case "S":
                format = format.replace(buffer, formatNumber(milliseconds, buffer.length, [1, 2, 3]));
                break;
            default:
                if (buffer.length > 1 && !['-', '/',' ',':','.'].includes(buffer[0])) {
                    throw new Error("Invalid format");
                }
        }
    }

  return format
}


function formatNumber(value: number, width: number, allowedWidths?: number[]): string {
    if (allowedWidths){
        if (!allowedWidths.includes(width)) {
            throw new Error("Invalid width");
        }
        return value.toString().padStart(width, "0");
    }
    return value.toString().padStart(width, "0");
}

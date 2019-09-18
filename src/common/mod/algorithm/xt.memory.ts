/**
 * 引用面象深拷贝
 * @param destination: 目标数据
 * @param source: 源数据
 * @return : 目标数据
 */
export function deepCopy(destination: any, source: any) {
    let sType: string = typeof(source);
    if (sType == "string" || sType == "number")
        return source

    if (destination == undefined)
        if (source != undefined && source.hasOwnProperty("length"))
            destination = []
        else
            destination = {}
    for (var property in source) {
        if (source.hasOwnProperty(property) && typeof(source[property]) == "object") {
            if (source[property] != null && source[property] != undefined && source[property].hasOwnProperty("length"))
                destination[property] = deepCopy([], source[property])
            else
                destination[property] = deepCopy({}, source[property])
        } else {
            destination[property] = source[property];
        }
    }
    return destination;
}

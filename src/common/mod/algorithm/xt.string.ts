/**
 * 将时间戳转换为指定format的字符串格式
 * @param h: 需要转换的日间对象，类型number【时间戳】或Date
 * @param format: 转换格式
 * @return: 返回字符串时间
 */
export function time2Str(h: number | Date, format: string = 'yyyy-MM-dd') {
    let newDate: Date = new Date();

    if (typeof h === 'number') {
        newDate.setTime(h);
    } else {
        newDate = h;
    }

    const date: object = {
        'M+': newDate.getMonth() + 1,
        'd+': newDate.getDate(),
        'h+': newDate.getHours(),
        'm+': newDate.getMinutes(),
        's+': newDate.getSeconds(),
        'q+': Math.floor((newDate.getMonth() + 3) / 3),
        'S+': newDate.getMilliseconds(),
    };

    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (newDate.getFullYear() + '').substr(4 - RegExp.$1.length));
    }

    for (const k in date) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length === 1 ?
                date[k] : ('00' + date[k]).substr(('' + date[k]).length));
        }
    }
    return format;
}


/**
 * 将给写字符串根据中文规则转换为大写，如：
 *      => a -> A
 *      => 1 -> 一
 * @param src: 待转字符串
 * @param numZhUpper: 数字是否使用中文大写, 如: 一 -> 壹
 * @return 转换后的字符串。
 */
export function upperCaseZh(src: string, numZhUpper: boolean = false): string {
    let ret: string = '';
    const numZhUpperList: string[] = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    const numZhLowerList: string[] = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];

    let ary: string[] = src.split('');
    ary.forEach((data: string) => {
        const charCode: number = data.charCodeAt(0);
        if (charCode >= 97 && charCode <= 122) {
            ret += String.fromCharCode(charCode - 32);
        } else if (charCode >= 48 && charCode <= 57) {
            if (numZhUpper) {
                ret += numZhUpperList[charCode - 48];
            } else {
                ret += numZhLowerList[charCode - 48];
            }
        } else {
            ret += data;
        }
    });

    return ret;
}

/**
 * 将字符符转换为unicode字符串
 * @param str： 待转字符串
 * @return: unicode编码的字符串
 */
export function encodeUnicode(str: string): string {
    let ret: string = "";
    for (var i = 0; i < str.length; i++) {
        ret += str.charCodeAt(i).toString(16);
    }
    return ret;
}

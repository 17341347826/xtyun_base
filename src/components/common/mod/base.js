export function getBtnList(btnList, btn) {
    if (btnList) {
        var lean = true;
        for (var i = 0; i < btnList.length; i++) {
            if (btnList[i].menu_info_do.url) {
                if (btnList[i].menu_info_do.url === btn) {
                    lean = false;
                }
            }
            else {
                if (btnList[i].menu_info_do.button_identify === btn) {
                    lean = false;
                }
            }
        }
        var bool = true;
        bool = lean;
        return bool;
    }
    else {
        return true;
    }
}
//# sourceMappingURL=base.js.map
export function getBtnList(btnList, btn): any {
    if (btnList) {
        let lean = true;
        for (let i = 0; i < btnList.length; i++) {
            if (btnList[i].menu_info_do.url) {
                if (btnList[i].menu_info_do.url === btn) {
                    lean = false;
                }
            } else {
                if (btnList[i].menu_info_do.button_identify === btn) {
                    lean = false;
                }
            }
        }
        let bool = true;
        bool = lean;
        return bool;
    } else {
        return true;
    }
}

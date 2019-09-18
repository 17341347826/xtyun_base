export class AddBasicInfo {
    public another_name: string | null = null; // 别名
    public attr_name: string | null = null; // 属性名称
    public fk_parent_id: string = '0'; // 上级记录编号
    public id: string | null = null; // 记录编号
    public map_list: any[] = [];
    public name: string | null = null; // 名称
    public rank: string | null = null; // 等级
}




export class DeleteId {
    public id: string | null = null;
}
/**
 * 各ノードのベースとなるインターフェイス
 */
 export interface INodeBase
 {
    index : number;
    name: string;
    parent : INodeBase | null;
    children: Array<INodeBase>;
 }
 
 /**
  * 構造ノード
  */
 export interface IStructureNode extends INodeBase
 {
     //一旦定義だけしておく
 }
 
 /**
  * テンプレートノード
  */
 export interface ITemplateNode extends INodeBase
 {
     content: string,
 }
//检查数独解决方案

function checkArray(array:number[]):boolean[]{
    const length = array.length;
    const marks:boolean[] = new Array(length);
    marks.fill(true);

    for(let i = 0; i < length; i++){
        if(!marks[i]){
            continue;
        }

        const v = array[i];
        //检查是否为0
        if(!v){
            marks[i] = false;
            continue;
        }
        //检查是否重复
        for(let j = i + 1; j < length; j++){
            if(v === array[j]){
                marks[i] = marks[j] = false;
            }
        }
         
    }

    return marks;
}

import Toolkit from "./toolkit";
//输入用户完成的matrix
//处理：对数组进行检查
//输出：检查是否成功，marks
export class Checker{
private _matrix:number[][];
private _matrixMarks:boolean[][];
private _success: boolean = false;

    constructor(matrix:number[][]){
        this._matrix = matrix;
        this._matrixMarks = Toolkit.matrix.makeMatrix(true);
    }

    get matrixMarks():boolean[][]{
        return this._matrixMarks;
    }

    get isSuccess():boolean{
        return this._success;
    }


    check():boolean{
        this.checkRows();
        this.checkCols();
        this.checkBoxes();

        this._success = this._matrixMarks.every(row => row.every(mark => mark));
        return this._success;
    }
        
    private checkCols(){
        for(let colIndex = 0; colIndex < 9; colIndex++){
            const cols=[];
            for(let rowIndex = 0; rowIndex < 9; rowIndex++){
                cols[rowIndex] = this._matrix[rowIndex][colIndex];
            }

            const marks = checkArray(cols);
            for(let rowIndex = 0; rowIndex < marks.length; rowIndex++){
                if(!marks[rowIndex]){
                    this._matrixMarks[rowIndex][colIndex] = false;
                }
            }
        }
    }

    private checkBoxes(){
        for(let boxIndex = 0;boxIndex < 9; boxIndex++){
            const boxes = Toolkit.box.getBoxCells(this._matrix,boxIndex);
            const marks = checkArray(boxes);
            for(let cellIndex = 0;cellIndex < 9;cellIndex++){
                if(!marks[cellIndex]){
                    const {rowIndex,colIndex}
                       = Toolkit.box.convertFromBoxIndex(boxIndex,cellIndex);
                    this._matrixMarks[rowIndex][colIndex] = false;
                }
            }
        }
    }

    private checkRows(){
        for(let rowIndex = 0; rowIndex < 9; rowIndex++){
            const row = this._matrix[rowIndex];
            const marks = checkArray(row);

            for(let colIndex = 0; colIndex < 9; colIndex++){
                if(!marks[colIndex]){
                    this._matrixMarks[rowIndex][colIndex] = false;
                }
            }
        }
    }
  
}

export default Checker;






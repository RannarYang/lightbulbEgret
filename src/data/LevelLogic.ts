class LevelLogic {
	private static spanningTree = [];
    private static spanningNode = [];
	public static getRandomLevel(grade = {line:8,col:7}) {
		this.spanningTree = [];
		this.spanningNode = [];
		//随机获取电源位置
		let powerNum = Math.ceil(Math.random() * grade.line * grade.col);
		let powerPos = LevelLogic.num2pos(powerNum, grade);
		/*
		data.powerState.x = powerPos.line;
		data.powerState.y = powerPos.col;
		*/
		let square = LevelLogic.createSpanningTree(grade, powerNum, powerPos);
		let level_el = {
			line: grade.line,
			col: grade.col,
			square: square
		};
		return level_el;
	}
	public static getDifferentNum(min, max, num, arr = null) {
		let temp_array = new Array();
		if (!arr) {
			for (let i = min; i <= max; i++) {
				temp_array.push(i);
			}
		} else {
			let arr_len = arr.length;
			for (let i = 0; i < arr_len; i++) {
				temp_array[i] = arr[i];
			}
		}
		let return_array = [];
		for (let j = 0; j < num; j++) {
			if (temp_array.length > 0) { //数组可以取出元素
				let arrIndex = Math.floor(Math.random() * temp_array.length); //产生一个随机索引
				//将此随机所以的对应的数组元素copy出来
				return_array[j] = temp_array[arrIndex];
				//delete 此索引的数组元素
				temp_array.splice(arrIndex, 1);
			} else {
				break;
			}
		}
		return return_array;
	}
	public static num2pos(num, grade) {
		let col = grade.col;
		let line = grade.line;
		return {
			line: Math.floor((num - 1) / col),
			col: (num - 1) % grade.col
		}
	}
	private static createSpanningTree(grade, parentState, powerPos) {
		LevelLogic.getCanAddChild(grade, parentState, powerPos, 1, 3, 0);
		this.makeLink(grade);
		//根据this.spanningTree设置关卡
		let square = [];
		let line = grade.line;
		let col = grade.col;
		for (let i = 0; i < line; i++) {
			square[i] = [];
			for (let j = 0; j < col; j++) {
				square[i][j] = {
					kind: "wine",
					type: "5",
					exit: [0, 0, 0, 0],
					init_rot: 90 * Math.floor(Math.random() * 4)
				};
				let num = this.pos2num({
					line: i,
					col: j
				}, grade);
				let node = this.spanningTree[num];
				if (node) {
					//设置exit
					LevelLogic.num2exit(num, node.parent, grade, square[i][j]);
					for (let k = 0, child_len = node.child.length; k < child_len; k++) {
						this.num2exit(num, node.child[k], grade, square[i][j]);
					}
					//设置kind
					if (num == parentState) {
						square[i][j].kind = "power";
					}
					if (node.child.length == 0) {
						square[i][j].kind = "unlight";
					}
					//设置type
					square[i][j].type = this.exit2type(square[i][j].exit);
					square[i][j].trueRot = this.exit2rot(square[i][j].exit,square[i][j].type);
					//console.log(square[i][j].exit,square[i][j].type);
				} else {
					//设置type
					square[i][j].type = Math.ceil(4 * Math.random()) + 1;
					//设置exit
					this.changeExit(square[i][j]);
				}
			}
		}
		return square;
	}
	private static makeLink(grade) {
		//获取spanningNode的补集合（没有连通的节点）
		let max = grade.line * grade.col;
		let temp_array = [];
		for (let i = 1; i <= max; i++) {
			temp_array.push(i);
		}
		let remainUnlink = this.minus(temp_array, this.spanningNode);
		let unlink_len = remainUnlink.length;
		for (let i = 0; i < unlink_len; i++) {
			let canLink = [];
			let itState = remainUnlink[i];
			let state = this.num2pos(itState, grade);
			let line = state.line;
			let col = state.col;
			if (this.isInGrid(itState - 1, grade) && col > 0) {
				canLink.push(itState - 1);
			}
			if (this.isInGrid(itState + 1, grade) && col < grade.col - 1) {
				canLink.push(itState + 1);
			}
			if (this.isInGrid(itState + grade.col, grade) && line < grade.line - 1) {
				canLink.push(itState + grade.col);
			}
			if (this.isInGrid(itState - grade.col, grade) && line > 0) {
				canLink.push(itState - grade.col);
			}
			canLink = this.intersection(canLink, this.spanningNode);
			if (canLink.length) {
				let index = Math.floor((Math.random() * canLink.length));
				let parent = canLink[index]; //获取canLink数组中的其中一个数值
				let parentNode = this.spanningTree[parent];
				let len = parentNode.child.length;
				if (len < 2) {
					//添加新Link
					parentNode.child.push(itState);
					this.spanningTree[itState] = {
						parent: parent,
						child: []
					}
					this.spanningNode.push(itState);
				}
			}
		}
		if (this.spanningNode.length < max - 3) this.makeLink(grade);
	}
	private static getCanAddChild(grade, parentState, powerPos, minChild, maxChild, parent) {
            //判断树中有没有
            if (!this.isInTree(parentState)) {
                return;
            }
            if (!this.isInGrid(parentState, grade)) {
                return;
            }
            let canMove = [];
            let state = this.num2pos(parentState, grade);
            let line = state.line;
            let col = state.col;
            if (this.isInGrid(parentState - 1, grade) && col > 0) {
                canMove.push(parentState - 1);
            }
            if (this.isInGrid(parentState + 1, grade) && col < grade.col - 1) {
                canMove.push(parentState + 1);
            }
            if (this.isInGrid(parentState + grade.col, grade) && line < grade.line - 1) {
                canMove.push(parentState + grade.col);
            }
            if (this.isInGrid(parentState - grade.col, grade) && line > 0) {
                canMove.push(parentState - grade.col);
            }
            canMove = this.minus(canMove, this.spanningNode);
            let childNum = Math.floor(minChild + Math.random() * (Math.min(canMove.length, maxChild)));
            let child = this.getDifferentNum(null, null, childNum, canMove);
            let node = {
                parent: parent,
                child: child
            }
            this.spanningNode.push(parentState);
            this.spanningTree[parentState] = node;
            let child_len = child.length;
            for (let i = 0; i < child_len; i++) {
                let pos = this.num2pos(child[i], grade);
                this.getCanAddChild(grade, child[i], pos, 0, 3, parentState);
            }
        }
        //rot2exit
        private static changeExit(square) {
            let time;
            switch ("type" + square.type) {
                case "type1":
                    square.exit = [0, 0, 0, 0];
                    time = square.rot / 90 % 4;
                    square.exit[time] = true;
                    break;
                case "type2":
                    square.exit = [0, 0, 0, 0];
                    time = square.rot / 90 % 2;
                    if (time == 1) {
                        square.exit = [0, true, 0, true];
                    } else {
                        square.exit = [true, 0, true, 0];
                    }
                    break;
                case "type3":
                    square.exit = [true, true, true, true];
                    time = square.rot / 90 % 4;
                    square.exit[time] = false;
                    break;
                case "type4":
                    square.exit = [0, 0, 0, 0];
                    time = square.rot / 90 % 4;
                    square.exit[time] = true;
                    square.exit[(time - 1 + 4) % 4] = true;
                    break;
                case "type5":
                    square.exit = [0, 0, 0, 0];
                    break;
            }
        }
        //exit2rot
        private static exit2rot(exit,type){
            let rot;
            switch(type){
                case 1:
                case 2:
                    rot = exit.indexOf(true)*90;
                    break;
                case 3:
                    rot = exit.indexOf(0)*90;
                    break;
                case 4:
                    let indexTrue = exit.indexOf(true);
                    if(indexTrue!==0){
                        rot = (indexTrue+1) * 90;
                    }else{
                        let indexFalse = exit.indexOf(0);
                        if(indexFalse==1){
                            rot = 0;
                        }else{
                            rot = 90;
                        }
                    }
                    //console.log(exit);
                    //console.log("rot",rot);
            }
            return rot;
        }
        //辅助方法
        private static isInGrid(num, grade) {
            let max = grade.line * grade.col;
            if (0 < num && num <= max) {
                return true;
            } else {
                return false;
            }
        }
        private static isInTree(state) {
            return this.spanningNode.indexOf(state);
        }
        private static pos2num(pos, grade) {
            return pos.line * grade.col + pos.col + 1;
        }
        private static num2exit(center, num, grade, square) {
            switch (center - num) {
                case 1: //left
                    square.exit[0] = true;
                    break;
                case -1: //right
                    square.exit[2] = true;
                    break;
                case grade.col: //top
                    square.exit[1] = true;
                    break;
                case -grade.col: //bottom
                    square.exit[3] = true;
                    break;
            }
        }
        private static exit2type(exit) { //exit是数组[0,0,0,0]
            let time = 0;
            exit.forEach(function(e, i, array) {
                if (e == 1) {
                    time++;
                }
            });
            //type1或type3
            if (time == 1 || time == 3) {
                return time;
            }
            //判断是type2还是type4
            if ((exit[0] && exit[2]) || (exit[1] && exit[3])) {
                return 2;
            } else {
                return 4;
            }
        }

		//差集
        private static minus(arr1, arr2) {
            let arr3 = new Array();
            let arr1_len = arr1.length;
            let arr2_len = arr2.length;
            for (let i = 0; i < arr1_len; i++) {
                let flag = true;
                for (let j = 0; j < arr2_len; j++) {
                    if (arr1[i] == arr2[j])
                        flag = false;
                }
                if (flag)
                    arr3.push(arr1[i]);
            }
            return arr3;
        }
        //交集
        private static intersection(arr1, arr2) {
            let arr3 = new Array();
            let arr1_len = arr1.length;
            let arr2_len = arr2.length;
            for (let i = 0; i < arr1_len; i++) {
                for (let j = 0; j < arr2_len; j++) {
                    if (arr1[i] == arr2[j]) {
                        arr3.push(arr1[i]);
                        break;
                    }
                }
            }
            return arr3;
        }
}
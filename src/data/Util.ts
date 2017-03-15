class Util {
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
	//rot2exit
	public static getExitByTypeAndRot(type:number, rot:number): boolean[] {
		let time;
		let exit = [];
		switch ("type" + type) {
			case "type1":
				exit = [false, false, false, false];
				time = rot / 90 % 4;
				exit[time] = true;
				break;
			case "type2":
				exit = [false, false, false, false];
				time = rot / 90 % 2;
				if (time == 1) {
					exit = [false, true, false, true];
				} else {
					exit = [true, false, true, false];
				}
				break;
			case "type3":
				exit = [true, true, true, true];
				time = rot / 90 % 4;
				exit[time] = false;
				break;
			case "type4":
				exit = [false, false, false, false];
				time = rot / 90 % 4;
				exit[time] = true;
				exit[(time - 1 + 4) % 4] = true;
				break;
			case "type5":
				exit = [false, false, false, false];
				break;
		}
		return exit;
	}
}
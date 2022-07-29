var sudokuApp = new Vue({
    el: '#app-sudoku',

	//Khoi tao cac bien va gia tri dau
    data: {
        sudokuMatrix: [],
        answerImage: "",
        isGameStarted: false,
        showAnswer: false,
        isNewGame: true,
        getLevel: 0, 
        mt: [],
    },

	//Day anh chien thang va that bai vao
    mounted() {
        // Preload image
        new Image().src = 'fail.gif';
        new Image().src = 'success.gif';
    },

	//Bat dau viet ham
    methods: {
		//Ham Tao Game truyen vao do kho lay tu form index(bien level)
        initializeGame(level) {
            this.getLevel = level;
            this.mt = generate();
            var defaultSudokuMatrix = this.mt.result;

            // Empty random cells per row //De trong ngau nhien cac o trong 1 hang 
            for (var i = 0; i < defaultSudokuMatrix.length; ++i) {
                var k = 0;
                while (k < level) {
                    var randomColumnIndex = Math.floor(Math.random() * defaultSudokuMatrix.length);
                    if (defaultSudokuMatrix[i][randomColumnIndex].num != "") {
                        k++;
                        defaultSudokuMatrix[i][randomColumnIndex].num = "";
                        defaultSudokuMatrix[i][randomColumnIndex].readOnly = false;
                    }
                }
            }

            this.sudokuMatrix = defaultSudokuMatrix;
            this.isGameStarted = true;
            this.isNewGame = false;
        },

        check()
        {
            this.sudokuMatrix = this.mt.sudoku;
            this.isGameStarted = true;
            this.isNewGame = false;
        },
	//Ham kiem tra dap an da dung chua
        evaluateGame() {
            var result = sudoku.map((x, i) => sudoku[i].map(y => parseInt(y.num)));
            var maxtrixCheck = this.sudokuMatrix.map((x, i) => this.sudokuMatrix[i].map(y => parseInt(y.num)));

            if (JSON.stringify(result) == JSON.stringify(maxtrixCheck)) {
                   this.answerImage = "success.gif";

                this.showAnswer = true;
                this.isGameStarted = false;
                this.isNewGame = false;

                setTimeout(() => {
                    this.showAnswer = false;
                    this.isGameStarted = true;
                    this.isNewGame = false;
                }, 4000);
            }
            else {
                this.answerImage = "fail.gif";
                this.showAnswer = true;
                this.isGameStarted = false;
                this.isNewGame = false;

                setTimeout(() => {
                    this.showAnswer = false;
                    this.isGameStarted = true;
                    this.isNewGame = false;
                }, 2000);
            }
        },

	//Ham khoi dong lai tro choi
        restart() {
            this.isGameStarted = false;
            this.showAnswer = false;
            this.isNewGame = true;
        },

	//Ham co the sua doi cac o
        formatCell(row, cell) {
            if (this.sudokuMatrix[row][cell].num.length > 1) {
                this.sudokuMatrix[row][cell].num = this.sudokuMatrix[row][cell].num[1];
            }
        },

	//Ham chi truyen o so
        onlyNumber($event) {
            let keyCode = ($event.keyCode ? $event.keyCode : $event.which);

            if (keyCode < 48 || keyCode > 57) {
                $event.preventDefault();
            }
        }
    }
});

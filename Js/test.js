$(document).ready(function() {
    var vocabularyList;
    var currentQuestion = 0;
    var correctAnswers = 0;
    var quizContainer = $("#quiz-container");
    var resultContainer = $("#result-container");
    var scoreContainer = $("#score");
    var answersContainer = $("#answers");
    var backBtn = $("#back-btn");
    var startBtn = $("#start-btn");
    var questionText = $("#question-text");
    var optionsContainer = $("#options-container");
    var submitBtn = $("#submit-btn");
    var nextBtn = $("#next-btn");

    startBtn.click(function() {
        var inputText = $("#vocabulary-input").val();
        vocabularyList = parseInputText(inputText);

        if (vocabularyList.length > 0) {
            $("#input-container").hide();
            generateQuestion();
            quizContainer.show();
        } else {
            alert("Vui lòng nhập danh sách từ vựng!");
        }
    });

    backBtn.click(function() {
        resultContainer.hide();
        quizContainer.show();
        resetQuiz();
    });

    submitBtn.click(function() {
        var selectedOption = $("input[name='option']:checked").val();
        if (selectedOption !== undefined) {
            checkAnswer(selectedOption);
            optionsContainer.find("input").attr("disabled", true);
            submitBtn.hide();
            nextBtn.show();
        } else {
            alert("Vui lòng chọn một đáp án!");
        }
    });

    nextBtn.click(function() {
        currentQuestion++;
        if (currentQuestion < vocabularyList.length) {
            generateQuestion();
            optionsContainer.find("input").attr("disabled", false);
            submitBtn.show();
            nextBtn.hide();
        } else {
            showFinalResult();
        }
    });

    // Tạo câu hỏi và đáp án
    function generateQuestion() {
        resetOptions();
        questionText.text("Câu hỏi số " + (currentQuestion + 1));
        var question = vocabularyList[currentQuestion];
        var correctAnswer = question.meaning;
        var options = generateOptions(correctAnswer);

        questionText.text("Nghĩa của từ '" + question.word + "' là gì?");

        for (var i = 0; i < options.length; i++) {
            var option = options[i];
            var optionHtml = "<label><input type='radio' name='option' value='" + option + "'> " + option + "</label>";
            optionsContainer.append(optionHtml);
        }
    }

    // Kiểm tra đáp án và tăng số câu đúng
    function checkAnswer(selectedOption) {
        var correctAnswer = vocabularyList[currentQuestion].meaning;
        if (selectedOption === correctAnswer) {
            correctAnswers++;
            $("input[name='option']:checked").parent().addClass("correct-answer");
        } else {
            $("input[name='option']:checked").parent().addClass("incorrect-answer");
            $("input[value='" + correctAnswer + "']").parent().addClass("correct-answer");
        }
    }

    // Hiển thị kết quả cuối cùng
    function showFinalResult() {
        quizContainer.hide();
        resultContainer.show();
        scoreContainer.text("Kết quả: " + correctAnswers + " / " + vocabularyList.length);
        showAnswers();
    }

    // Hiển thị đáp án đúng cho từng câu hỏi
    function showAnswers() {
        answersContainer.empty();
        for (var i = 0; i < vocabularyList.length; i++) {
            var question = vocabularyList[i];
            var questionHtml = "<div class='question'>Câu hỏi số " + (i + 1) + ": Nghĩa của từ '" + question.word + "' là?</div>";
            var correctAnswerHtml = "<div class='correct-answer'>Đáp án đúng: " + question.meaning + "</div>";
            answersContainer.append(questionHtml + correctAnswerHtml);
        }
    }

    // Tạo một mảng chứa đáp án và các phương án sai ngẫu nhiên
    function generateOptions(correctAnswer) {
        var options = [];
        options.push(correctAnswer);

        while (options.length < 4) {
            var randomIndex = Math.floor(Math.random() * vocabularyList.length);
            var wrongOption = vocabularyList[randomIndex].meaning;

            if (!options.includes(wrongOption)) {
                options.push(wrongOption);
            }
        }

        options.sort(function() {
            return 0.5 - Math.random();
        });

        return options;
    }

    // Chuyển đổi văn bản nhập vào thành danh sách từ vựng
    function parseInputText(inputText) {
        var lines = inputText.split("\n");
        var parsedList = [];

        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            var parts = line.split(":");
            if (parts.length === 2) {
                var word = parts[0].trim();
                var meaning = parts[1].trim();
                var item = { word: word, meaning: meaning };
                parsedList.push(item);
            }
        }

        return parsedList;
    }

    // Đặt lại các tùy chọn
    function resetOptions() {
        optionsContainer.empty();
    }

    // Đặt lại trạng thái của bài kiểm tra
    function resetQuiz() {
        currentQuestion = 0;
        correctAnswers = 0;
    }
});
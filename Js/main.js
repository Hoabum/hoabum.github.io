$(document).ready(function() {
    var vocabularyList = [];

    function addVocabulary() {
        var input = $("#vocabulary-input").val();

        if (input) {
            var vocabulary = input.split(":");
            var word = vocabulary[0].trim();
            var definition = vocabulary[1].trim();

            if (word && definition) {
                vocabularyList.push({ word: word, definition: definition });
            }

            $("#vocabulary-input").val("");
            generateQuestion();
        }
    }
    var questionIndex = 0;
    var score = 0;

    function generateQuestion() {
        if (questionIndex >= vocabularyList.length) {
            showResult();
            return;
        }

        var question = vocabularyList[questionIndex].word;
        var options = getRandomOptions(questionIndex);

        $("#question").text(question);
        $("#options").empty();

        for (var i = 0; i < options.length; i++) {
            var option = $("<input type='radio' name='option' value='" + options[i].definition + "'> " + options[i].definition + "<br>");
            $("#options").append(option);
        }
    }

    function getRandomOptions(questionIndex) {
        var options = vocabularyList.slice(); // Copy the vocabulary list
        options.splice(questionIndex, 1); // Remove the correct answer from the options
        options = shuffle(options).slice(0, 3); // Randomly select 3 incorrect options
        options.push(vocabularyList[questionIndex]); // Add the correct answer to the options
        return shuffle(options);
    }

    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    function showResult() {
        $("#question").empty();
        $("#options").empty();
        $("#result").text("Score: " + score + "/" + vocabularyList.length);
        $("#back-btn").show();
    }

    $("#submit-btn").click(function() {
        var selectedOption = $("input[name='option']:checked").val();
        var correctOption = vocabularyList[questionIndex].definition;

        if (selectedOption === correctOption) {
            score++;
        }

        questionIndex++;
        generateQuestion();
    });

    $("#back-btn").click(function() {
        questionIndex = 0;
        score = 0;
        $("#result").empty();
        $("#back-btn").hide();
        generateQuestion();
    });

    generateQuestion();
});
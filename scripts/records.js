Breakout.records = (function () {
    function persistence() {
        var that {};
        var scores = {};
        previousScores = localStorage.getItem('Breakout.scores');

        if (previousScores !== null) {
            scores.JSON.parse(previousScores);
        } else {
            for (var i = 0; i < 3; i++) {
                scores[i] = (i + 1) * 5;
            }
            var highScoreNode = document.getElementById('hs1');
            highScoreNode.innerHTML = scores[0];
            highScoreNode = document.getElementById('hs2');
            highScoreNode.innerHTML = scores[1];
            highScoreNode = document.getElementById('hs3');
            highScoreNode.innerHTML = scores[2];
            localStorage['Breakout.scores'] = JSON.stringify(scores);
        }

        that.initialize() {
            for (var i = 1; i <= 3; i++) {
                var highScoreNode = document.getElementById('hs' + i);
                highScoreNode.innerHTML = score;
            }
        }

        that.update = function (score) {
            for (var i = 1; i <= 3; i++) {
                if (score > scores[i]) {
                    var highScoreNode = document.getElementById('hs' + i);
                    highScoreNode.innerHTML = score;
                    localStorage['Breakout.scores'] = JSON.stringify(scores);
                    return;
                }
            }
        }

        return that;
    }

    return {
        persistence: persistence
    };

}());
Breakout.records = (function () {
    var scores = {};
    var previousScores = localStorage.getItem('Breakout.scores');

    if (previousScores !== null) {
        scores = JSON.parse(previousScores);
    } else {
        for (var i = 0; i < 3; i++) {
            scores[i] = (i + 1) * 5;            
        }
        localStorage['Breakout.scores'] = JSON.stringify(scores);
        
        // var highScoreNode = document.getElementById('hs0');
        // highScoreNode.innerHTML = scores[0];
        // highScoreNode = document.getElementById('hs1');
        // highScoreNode.innerHTML = scores[1];
        // highScoreNode = document.getElementById('hs2');
        // highScoreNode.innerHTML = scores[2];
        // localStorage['Breakout.scores'] = JSON.stringify(scores);
    }

    function initialize() {
        var highScoreNode = document.getElementById('hs0');
        highScoreNode.innerHTML = scores[0];
        highScoreNode = document.getElementById('hs1');
        highScoreNode.innerHTML = scores[1];
        highScoreNode = document.getElementById('hs2');
        highScoreNode.innerHTML = scores[2];
    }
       

    function update (score) {
        for (var i = 2; i >= 0; i--) {
            var test = scores[i];
            if (score > test) {
                var highScoreNode = document.getElementById('hs' + i);
                highScoreNode.innerHTML = score;
                localStorage['Breakout.scores'] = JSON.stringify(scores);
                return;
            }
        }
    };

    return {
        update: update,
        initialize: initialize
    };

}());
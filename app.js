var app = angular.module('starApp', []);

app.controller('StarCtrl', ['$scope',
    function($scope) {


        $scope.init = function() {
            $scope.img = new Image();
            $scope.img.src = 'star-with-transparent-bg.png';
            $scope.img.onload = function() {
                ctx.drawImage($scope.img, 0, 0);
                $scope.img.style.display = 'none';
                $scope.imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                $scope.d = $scope.imageData.data;
            };
        }

        $scope.sliderValue = 0
        $scope.inputValue = $scope.sliderValue

        $scope.velocityChange = function() {

            var sliderValue = parseInt($scope.sliderValue)
            $scope.inputValue = calculateSlider(sliderValue)
            var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            var d = imageData.data;

            if ($scope.inputValue > 0) {
                for (var i = 0; i < d.length; i += 4) {
                    d[i + 1] = $scope.d[i + 1] * ((100 - $scope.inputValue) / 100); // green
                    d[i + 2] = $scope.d[i + 2] * ((100 - $scope.inputValue) / 100); // blue
                }
            } else {
                for (var i = 0; i < d.length; i += 4) {
                    d[i] = $scope.d[i] * ((100 + $scope.inputValue) / 100); // red
                    d[i + 1] = $scope.d[i + 1] * ((100 + $scope.inputValue) / 100); // green
                }
            }
            ctx.putImageData(imageData, 0, 0);
        }

        $scope.inputChange = function() {
            var input = parseInt($scope.inputValue)
            if (input > -301 && input < 101) {
                $scope.sliderValue = calulateInput(input)
                $scope.velocityChange()
            } else {
                window.alert('Value out of range')
                $scope.sliderValue = $scope.inputValue = 0
                ctx.putImageData($scope.imageData, 0, 0);
            }
        }
    }
]);

function calculateSlider(val) {
    if (val > 0) {
        return val;
    } else {
        return Math.round(val / 3);
    }
}

function calulateInput(input) {
    if (input > 0) {
        return input
    } else {
        return Math.round(input * 3)
    }
}

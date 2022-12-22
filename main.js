song = '';

leftWristY = 0;
leftWristX = 0;
rightWristY = 0;
rightWristX = 0;

scoreleftWrist = 0;
scorerightWrist = 0;

function   preload(){
    song = loadSound('music.mp3');
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded); 
    poseNet.on('pose', gotPoses)
}

function gotPoses(results){
    if(results.length > 0) {
        console.log(results);

        leftWristX = results[0].pose.leftWrist.X;
        leftWristY = results[0].pose.leftWrist.Y;
        rightWristX = results[0].pose.rightWrist.X;
        rightWristY = results[0].pose.rightWrist.Y;

        scoreleftWrist = results[0].pose.keypoints[9].score;
        scorerightWristX = results[0].pose.keypoints[10].score;
    }

}

function modelLoaded(){
    console.log("Model has Loaded");
}

function draw(){
    image(video, 0,0, 600, 500);
    fill("#ff0000");
    stroke("#ff0000");

    if(scorerightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);

        if(rightWristY > 0 && rightWristY <= 100) {
            song.rate(0.5);
            document.getElementById("speed").innerHTML = "Speed : 0.5"; 
        }
        else if(rightWristY > 100 && rightWristY <= 200) {
            song.rate(1);
            document.getElementById("speed").innerHTML = "Speed : 1.0"; 
        }
        else if(rightWristY > 200 && rightWristY <= 300) {
            song.rate(1.5);
            document.getElementById("speed").innerHTML = "Speed : 1.5"; 
        }
        else if(rightWristY > 300 && rightWristY <= 400) {
            song.rate(2);
            document.getElementById("speed").innerHTML = "Speed : 2.0"; 
        }
        else if(rightWristY > 400 && rightWristY <= 500) {
            song.rate(2.5);
            document.getElementById("speed").innerHTML = "Speed : 2.5"; 
        }
    }

    if(scoreleftWrist > 0.2){

        circle(leftWristX, leftWristY, 20);
        inNumberleftWristY = Number(leftWristY);

        volume1 = floor(inNumberleftWristY);
        volume = volume1/500;
        document.getElementById("volume").innerHTML = "Volume :"+volume;
        song.setVolume(volume);
    }

}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
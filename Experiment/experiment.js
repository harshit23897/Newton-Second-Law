/*
    Author: Harshit Jain
    Institution: IIIT Vadodara
*/

/*----------------------  Global Variables ------------------*/
var group;
var group1;
var cuboidMaterial;
var edges;
var mainCuboid;
var mainLine2;
var force_pos;
var force_neg;
var value;
var myClock;
var myClock1;
var time;
var net_force_in_pos;
var net_acc_in_pos;
var massOfBlock;
var Velocity;
var temp = 0;
var stopClicked;
var temp1 = 0;
var started = 0;
var initialPosition;
var initialPositionY;
var clockTime;
var verticalVelocity;
var verticalAcc;

/*----------------------  Initialization ------------------*/
function initialiseVariables()
{
    group = new THREE.Group();
    group1 = new THREE.Group();
    force_pos = 0;
    force_neg = 0;
    myClock = new THREE.Clock();
    myClock1 = new THREE.Clock();
    time = 0;
    massOfBlock = 1;
    Velocity = 0;
    clockTime = 0;
    net_acc_in_pos = 0;
    clockTime = 0;
    started = 0;
    net_force_in_pos = 0;
    verticalVelocity = 0;
    verticalAcc = -9.8;
    stopClicked = 0;
    initialPosition = 0;
    initialPositionY = 1;
}

function initialiseHelp()
{
    helpContent="";
    helpContent = helpContent + "<h2>Newton's Second Law Experiment</h2>";
    helpContent = helpContent + "<h3>About the experiment</h3>";
    helpContent = helpContent + "<p>The experiment shows a block sitting on top of a surface which moves if force is applied to it and eventually falls of the surface.</p>";
    helpContent = helpContent + "<h3>Selecting Parameters</h3>";
    helpContent = helpContent + "<p>The control section has four slider options.</p>";
    helpContent = helpContent + "<p>The first one is for the position of the block on the surface.</p>";
    helpContent = helpContent + "<p>The second one is for the force applied on the block in positive X direction.</p>";
    helpContent = helpContent + "<p>The third one is for the force applied on the block in negative X direction.</p>";
    helpContent = helpContent + "<p>The fourth one is for the mass of the block.</p>";
    helpContent = helpContent + "<h3>Animation Controls</h3>";
    helpContent = helpContent + "<p>Once you have selected the values of all the parameters, you can click on start/stop button which is initially set to start</p>";
    helpContent = helpContent + "<p>Click on start which will change the button to stop.</p>";
    helpContent = helpContent + "<p>Now the animation has started.</p>";
    helpContent = helpContent + "<p>On the right side, you can see the velocity of the block (velocityx100, which means the actual velocity is (the shown velocity)/100) and the time spent(in seconds).</p>";
    helpContent = helpContent + "<p>The block will start moving in the direction depending on the magnitude of the net force in the horizontal direction on the block.</p>";
    helpContent = helpContent + "<p>Once the block reaches the end of the surface, it will fall down.</p>";
    helpContent = helpContent + "<p>You can click the reset experiment button to start the experiment again.</p>";
    helpContent = helpContent + "<h2>Happy Experimenting</h2>";
    PIEupdateHelp(helpContent);
}

var infoContent;
function initialiseInfo()
{
    infoContent =  "";
    infoContent = infoContent + "<h2>Newton's Second Law Experiment concepts</h2>";
    infoContent = infoContent + "<h3>About the experiment</h3>";
    infoContent = infoContent + "<p>The experiment shows a block sitting on top of a surface which moves if force is applied to it and eventually falls of the surface.</p>";
    infoContent = infoContent + "<h3>Newton's Second Law</h3>";
    infoContent = infoContent + "<p>In an inertial reference frame, the vector sum of the forces <b>F</b> on an object is equal to the mass <b>m</b> of the object multiplied by the acceleration <b>a</b> of the object: <b>F = ma</b>. </p>";
    infoContent = infoContent + "<p>Till the object is on the surface it will only get accelerated due to forces in horizontal direction.</p>";
    infoContent = infoContent + "<p>The velocity of an object as a function of initial velocity, time and acceleration is given by: <b>v = u + a*t</b></p>";
    infoContent = infoContent + "<p>The position of an object as a function of velocity, time and acceleration is given by: <b>x = u*t + (1/2)*a*t*t</b></p>";
    infoContent = infoContent + "<p>The above two equations are used to determine the velocity and position of the block at every instant of time.</p>";
    infoContent = infoContent + "<p>Since, the aim of the experiment is to demonstrate Newton's Second Law, hence friction of the surface is ignored or taken to be 0.</p>";
    infoContent = infoContent + "<h2>Happy Experimenting</h2>";
    PIEupdateInfo(infoContent);
}

/*----------------------  Initialise scene to add background color to window and add Input Sliders and Text  ------------------*/
function initialiseScene()
{
    PIEscene.background = new THREE.Color( 0xc6e2ff );
    PIEaddInputSlider("Position", 0, change, -9.5, 9.5, 0.5);
    PIEaddInputSlider("Force(+X)", force_pos, Force_pos, -1, 1, 0.1);
    PIEaddInputSlider("Force(-X)", force_neg, Force_neg, -1, 1, 0.1);
    PIEaddInputSlider("Mass", 1, mass, 1, 20, 0.1);
    PIEaddDisplayText("Velocity*100(m/s)", 0);
    PIEaddDisplayText("Time(s)", 0);
}

/*----------------------  Utility functions to set values of variables based on user's selection  ------------------*/
function mass()
{
    if(started == 0)
    {
        value = PIEgetInputSlider("Mass");
        massOfBlock = value;
    }
}

function Force_pos()
{
    if(started == 0)
    {
        value = PIEgetInputSlider("Force(+X)");
        force_pos = value;
    }
}

function Force_neg()
{
    if(started == 0)
    {
        value = PIEgetInputSlider("Force(-X)");
        force_neg = value;
    }
}

function change()
{
    // console.log(started);
    if(started == 0)
    {
        value = PIEgetInputSlider("Position");
        initialPosition = value;
        // console.log(value); 
    }
}

/*----------------------  Functions to add Surface and Block  ------------------*/
function addSurface()
{
    cuboidMaterial = new THREE.MeshBasicMaterial({color: 0x3A281E, side: THREE.DoubleSide, shading: THREE.FlatShading});
    mainCuboid = new THREE.Mesh( new THREE.CubeGeometry( 20 , 1, 20),  cuboidMaterial);
    mainCuboid.position.set(0, 0, 2);
    
    edges = new THREE.EdgesGeometry( new THREE.BoxBufferGeometry( 20, 1, 20) );
    mainLine2 = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000 } ) );
    mainLine2.position.set(0, 0, 2);

    group.add(mainCuboid);
    group.add(mainLine2);
    group.position.set(0, 0, 0);
    PIEaddElement(group); 
}

function addBlock()
{
    cuboidMaterial = new THREE.MeshBasicMaterial({color: 0xB07B5A, side: THREE.DoubleSide, shading: THREE.FlatShading});
    mainCuboid = new THREE.Mesh( new THREE.CubeGeometry(4 , 1, 4),  cuboidMaterial);
    mainCuboid.position.set(0, 0, 2);
    
    edges = new THREE.EdgesGeometry( new THREE.BoxBufferGeometry(4, 1, 4) );
    mainLine2 = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000 } ) );
    mainLine2.position.set(0, 0, 2);

    group1.add(mainCuboid);
    group1.add(mainLine2);
    group1.position.set(0, 1, 0);
    PIEaddElement(group1);
}

/*----------------------  Function to resize rendering when window is resized  ------------------*/
window.onresize = function(){
    // console.log("Window size: "+window.innerWidth+"x"+window.innerHeight+"px");
    renderer.setSize(window.innerWidth,window.innerHeight);
    var aspectRatio = window.innerWidth/window.innerHeight;
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();
}

/*----------------------  Function to calculate nett. force and acceleration in +X direction.  ------------------*/
function calculate()
{
    net_force_in_pos = force_pos - force_neg;
    net_acc_in_pos = net_force_in_pos/massOfBlock;
    // console.log(net_acc_in_pos);
}

/*----------------------  Helper function which starts clock and animation and also calls calculate()  ------------------*/
function startExperiment()
{
    // console.log("HELLLO")
    ++started;
    calculate();
    startClock(0);
    ++temp;
    PIEstartAnimation();
}

/*----------------------  Helper function which stops clock.  ------------------*/
function stopClock()
{
    clockTime += myClock.getElapsedTime();
    myClock.stop();
    myClock1.stop();
    // console.log(myClock.oldTime);
}

/*----------------------  Helper function which starts clock.  ------------------*/
function startClock(a)
{
    if(a == 0)
        myClock.start();
    else
        myClock1.start();
}

function loadExperimentElements()
{
    PIEsetExperimentTitle("Newton's Second Law");
    PIEsetDeveloperName("Harshit Jain");

    initialiseVariables();
    initialiseScene();

    addSurface();
    addBlock();

    initialiseHelp();
    initialiseInfo();

    document.getElementById("start").addEventListener('click', startExperiment);
    document.getElementById("stop").addEventListener('click', stopClock);
    document.getElementById("pause").addEventListener('click', stopClock);

    PIEsetAreaOfInterest(15, -15, -15, 15);
}

function resetExperiment()
{
    addBlock();
    PIEchangeInputSlider("Position", 0);
    PIEchangeDisplayText("Time(s)", 0);
    massOfBlock = 1;
    Velocity = 0;
    initialPosition = 0;
    started = 0;
    verticalVelocity = 0;
    temp1 = 0;
    clockTime = 0;
    stopClicked = 0;
    initialPositionY = 1;
    clockTime = 0;
    document.getElementById("start").addEventListener('click', startClock);
    // console.log("Stop");
}

function updateExperimentElements(t, dt)
{
    if(Math.abs(group1.position.x) <= 13.6)
    {
        PIEchangeDisplayText("Time(s)", myClock.getElapsedTime());
        var c = clockTime + myClock.getElapsedTime();
        // console.log(c + " " + group1.position.x);
        if(temp > 0)
            group1.position.x = initialPosition + (1/2)*net_acc_in_pos*c*c + Velocity*c;
        Velocity = net_acc_in_pos*c;
        // console.log(Velocity);
        PIEchangeDisplayText("Velocity*100(m/s)", (Velocity*100));
    }
    else if(Math.abs(group1.position.y) <= 20)
    {
        if(temp1 == 0)
            startClock(1);
        ++temp1;
        var c = myClock1.getElapsedTime();
        group1.position.y = initialPositionY + (1/2)*verticalAcc*c*c + verticalVelocity*c;
        verticalVelocity = verticalAcc*c;
        c = clockTime + myClock.getElapsedTime();
        // console.log(c + " " + group1.position.x);
        if(temp > 0)
            group1.position.x = initialPosition + (1/2)*net_acc_in_pos*c*c + Velocity*c;
        Velocity = net_acc_in_pos*c;
        // console.log(Velocity);
    }
}
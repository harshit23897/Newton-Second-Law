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
var count = 0;
var handle;
var reseted;
var collided;
var massOfHammer;
var hammer;
var storedAngle1;
var raycaster;
var value;
var storedAngle;
var time_elapsed;
var myClock;
var acc_of_hammer;
var hingeFixed = 0;
var stored_final_velocity;
var myClock1;
var choice;
var time;
var net_force_in_pos;
var net_acc_in_pos;
var net_acc_in_pos_div;
var massOfBlock;
var Velocity;
var Velocity_div;
var temp = 0;
var stopClicked;
var temp1 = 0;
var clockWise;
var started = 0;
var ended = 0;
var initialPosition;
var initialPositionY;
var clockTime;
var verticalVelocity;
var verticalAcc;
var geometry;
var sta;
var block;
var learn_started = 0;
var timeElapsed;
var learn;
var displayItems = new Array(6);
var displayValues = new Array(6);

/*----------------------  Initialization ------------------*/
function initialiseVariables()
{
    group = new THREE.Group();
    group1 = new THREE.Group();
    force_pos = 0;
    learn_started = 0;
    force_neg = 0;
    myClock = new THREE.Clock();
    myClock1 = new THREE.Clock();
    time = 0;
    hingeFixed = 0;
    massOfBlock = 1;
    raycaster = new THREE.Raycaster();
    Velocity = 0;
    initialPosition = 0;
    reseted = 0;
    clockTime = 0;
    count = 0;
    massOfHammer = 5;
    net_acc_in_pos = 0;
    clockTime = 0;
    storedAngle = 0;
    started = 0;
    net_force_in_pos = 0;
    collided = 0;
    acc_of_hammer = 0;
    verticalVelocity = 0;
    verticalAcc = -9.8;
    time_elapsed = 0;
    sta = 0;
    stopClicked = 0;
    initialPosition = 0;
    initialPositionY = 1;
}

function initialiseOtherVariables()
{
    if(sta)
        document.body.removeChild( timeElapsed ); 
    timeElapsed = document.createElement( 'div' );
    timeElapsed.style.position = 'absolute';
    timeElapsed.style.top = window.innerHeight*(1)/10 + "px";
    timeElapsed.style.left = window.innerHeight*(0.2)/10 + "px";
    timeElapsed.style.width = 100;
    timeElapsed.style.color = '#000';
    timeElapsed.style.fontWeight = 'bold';
    timeElapsed.style.backgroundColor = 'transparent';
    timeElapsed.style.zIndex = '1';
    timeElapsed.style.fontFamily = 'Monospace';
    timeElapsed.innerHTML = "Time Elapsed: 0.00 s.";
    document.body.appendChild( timeElapsed ); 

    if(sta)
        document.body.removeChild( net_acc_in_pos_div );
    net_acc_in_pos_div = document.createElement( 'div' );
    net_acc_in_pos_div.style.position = 'absolute';
    net_acc_in_pos_div.style.top = window.innerHeight*(1.4)/10 + "px";
    net_acc_in_pos_div.style.left = window.innerHeight*(0.2)/10 + "px";
    net_acc_in_pos_div.style.width = 100;
    net_acc_in_pos_div.style.color = '#000';
    net_acc_in_pos_div.style.fontWeight = 'bold';
    net_acc_in_pos_div.style.backgroundColor = 'transparent';
    net_acc_in_pos_div.style.zIndex = '1';
    net_acc_in_pos_div.style.fontFamily = 'Monospace';
    var str = "2";
    net_acc_in_pos_div.innerHTML = "Acceleration: 0.00 m/s" + str.sup() + ".";
    document.body.appendChild( net_acc_in_pos_div );

    if(sta)
        document.body.removeChild( Velocity_div );
    Velocity_div = document.createElement( 'div' );
    Velocity_div.style.position = 'absolute';
    Velocity_div.style.top = window.innerHeight*(1.8)/10 + "px";
    Velocity_div.style.left = window.innerHeight*(0.2)/10 + "px";
    Velocity_div.style.width = 100;
    Velocity_div.style.color = '#000';
    Velocity_div.style.fontWeight = 'bold';
    Velocity_div.style.backgroundColor = 'transparent';
    Velocity_div.style.zIndex = '1';
    Velocity_div.style.fontFamily = 'Monospace';
    Velocity_div.innerHTML = "Velocity: 0.00 m/s.";
    document.body.appendChild( Velocity_div );

    learn = document.createElement( 'div' );
    learn.style.position = 'absolute';
    learn.style.top = window.innerHeight*(1.8)/10 + "px";
    learn.style.left = window.innerHeight*(8)/10 + "px";
    learn.style.width = 100;
    learn.style.color = '#000';
    learn.style.fontWeight = 'bold';
    learn.style.backgroundColor = 'transparent';
    learn.style.zIndex = '1';
    learn.style.fontFamily = 'Monospace';
    learn.innerHTML = '';
    document.body.appendChild( learn );
}

function initialiseHelp()
{
    helpContent="";
    helpContent = helpContent + "<h2>Newton's Second Law Experiment</h2>";
    helpContent = helpContent + "<h3>About the experiment</h3>";
    helpContent = helpContent + "<p>The experiment shows a block sitting on top of a surface which moves if force is applied to it and eventually falls of the surface.</p>";
    helpContent = helpContent + "<h3>Selecting Parameters</h3>";
    helpContent = helpContent + "<p>The control section has one slider option and two check boxes.</p>";
    helpContent = helpContent + "<p>The first one is for the mass of the block.</p>";
    helpContent = helpContent + "<p>The second one is to fix hammer in a particular position so that after selecting it, hammer can only rotate.</p>";
    helpContent = helpContent + "<p>The third one is for the direction of rotation of hammer (clockwise or anti-clockwise, default is anti-clockwise)</p>";
    helpContent = helpContent + "<h3>Animation Controls</h3>";
    helpContent = helpContent + "<p>First select a mass of block of appropriate choice. Once you have pressed start button and the animation started, mass of block cannot be changed.</p>";
    helpContent = helpContent + "<p>Next drag block at any position.</p>";
    helpContent = helpContent + "<p>Next drag hammer at any position.</p>";
    helpContent = helpContent + "<p>If the position of hammer is final, then click on FixHammer checkbox(Once it is clicked then the position of hammer cannot be changed during the current experiment).</p>";
    helpContent = helpContent + "<p>Next rotate the hammer at any angle and once finalized click on Rotate ClockWise checkbox.</p>";
    helpContent = helpContent + "<p>Now all the values are set. Click on start button to start animation.</p>";
    helpContent = helpContent + "<p>Now the animation has started.</p>";
    helpContent = helpContent + "<p>You can see the hammer coming down under the force of gravity and if it will hit the block it will create acceleration in the block.</p>";
    helpContent = helpContent + "<p>On the top left side, you can see the Time, Velocity and Acceleration.</p>";
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
    infoContent = infoContent + "<p>Since, the aim of the experiment is to demonstrate Newton's Second Law, hence friction of the surface is ignored or taken to be 0 also air resistance is neglected.</p>";
    infoContent = infoContent + "<h2>Happy Experimenting</h2>";
    PIEupdateInfo(infoContent);
}

/*----------------------  Initialise scene to add background color to window and add Input Sliders and Text  ------------------*/
function initialiseScene()
{
    PIEscene.background = new THREE.Color( 0xc6e2ff );
    PIEaddInputSlider("Mass", 1, mass, 1, 20, 0.1);
    PIEaddDisplayCheckbox("FixHammer", false, fixHammerPosition);
    PIEaddInputCheckbox("FixHammer", false, fixHammerPosition);
    PIEaddDisplayCheckbox("Rotate ClockWise", false, rotateClockWise);
    PIEaddInputCheckbox("Rotate ClockWise", false, rotateClockWise);
    PIEaddButton("Learn");
}

/*----------------------  Function to fix the position of hammer once user clicks FixHammer   ------------------*/
function fixHammerPosition()
{
    if(!hingeFixed)
        hingeFixed = 1;
    PIEchangeDisplayCheckbox("FixHammer", true, fixHammerPosition);
    PIEchangeInputCheckbox("FixHammer", true, fixHammerPosition);
}

function rotateClockWise()
{
    var tt = PIEgetDisplayCheckbox("Rotate ClockWise");
    if(tt == true)
    {
        clockWise = 0;
        PIEchangeInputCheckbox("Rotate ClockWise", false);
        PIEchangeDisplayCheckbox("Rotate ClockWise", false);
    }
    else
    {
        PIEchangeDisplayCheckbox("Rotate ClockWise", true);
        PIEchangeInputCheckbox("Rotate ClockWise", true);
        clockWise = 1;
    }
}

/*----------------------  Function to remove items when the user clicks on learn button.  ------------------*/
function removeItems()
{
    if(ended && !learn_started)
    {
        learn_started++;
        PIEremoveElement(group);
        PIEremoveElement(block);
        PIEremoveElement(handle);

        timeElapsed.innerHTML = '';
        net_acc_in_pos_div.innerHTML = '';
        Velocity_div.innerHTML = '';

        choice = Math.floor((Math.random() * 4) + 1);
        
        learn = document.createElement( 'div' );
        learn.style.position = 'absolute';
        learn.style.top = window.innerHeight*(1.8)/10 + "px";
        learn.style.left = window.innerHeight*(8)/10 + "px";
        learn.style.width = 100;
        learn.style.color = '#000';
        learn.style.fontWeight = 'bold';
        learn.style.backgroundColor = 'transparent';
        learn.style.zIndex = '1';
        learn.style.fontFamily = 'Monospace';
        learn.innerHTML = "<b>Check your learning. Calculate the missing(?) values.</b>";
        learn.innerHTML += "<p></p>Hints:<p>v = u + a*t</p><p>f = m*a</p>";
        if(choice != 1)
            learn.innerHTML += "<p>Initial Velocity(u): 0 m/s.</p>"
        else
            learn.innerHTML += "<p>Initial Velocity(u): ? m/s.</p>"
        if(choice != 2)
            learn.innerHTML += "<p>Final Velocity(v): " + parseFloat(stored_final_velocity).toFixed(2) + " m/s.</p>"
        else
            learn.innerHTML += "<p>Final Velocity(v): ? m/s.</p>"
        if(choice != 3)
            learn.innerHTML += "<p>Mass(m): " + parseFloat(massOfBlock).toFixed(2) + " kg.</p>"
        else
            learn.innerHTML += "<p>Mass(m): ? kg.</p>"
        var temp = "2";
        if(choice != 4)
            learn.innerHTML += "<p>Force(f): " + parseFloat(net_force_in_pos).toFixed(2) + " kg.m/s" + temp.sup() + ".</p>";
        else
            learn.innerHTML += "<p>Force(f): ? kg.m/s" + temp.sup() + ".</p>";
        learn.innerHTML += "<p>Acceleration(a): " + parseFloat(net_acc_in_pos).toFixed(2) + " m/s" + temp.sup() + ".</p>";
        learn.innerHTML += "<p>Time(t): " + parseFloat(time_elapsed).toFixed(2) + "</p>";
        var buttonnode= document.createElement('input');
        buttonnode.setAttribute('type','button');
        buttonnode.setAttribute('name','Show');
        buttonnode.setAttribute('value','Show');
        buttonnode.addEventListener("click", showAnswer);
        learn.appendChild(buttonnode);
        document.body.appendChild( learn );
    }
}

/*----------------------  Function to show answer when the user clicks on show button in learn button window.  ------------------*/
function showAnswer()
{
    document.body.removeChild(learn);
    learn = document.createElement( 'div' );
    learn.style.position = 'absolute';
    learn.style.top = window.innerHeight*(1.8)/10 + "px";
    learn.style.left = window.innerHeight*(8)/10 + "px";
    learn.style.width = 100;
    learn.style.color = '#000';
    learn.style.fontWeight = 'bold';
    learn.style.backgroundColor = 'transparent';
    learn.style.zIndex = '1';
    learn.style.fontFamily = 'Monospace';
    learn.innerHTML = "<b>Check your learning. Calculate the missing(?) values.</b>";
    learn.innerHTML += "<p>Initial Velocity(u): 0 m/s.</p>"
    learn.innerHTML += "<p>Final Velocity(v): " + parseFloat(stored_final_velocity).toFixed(2) + " m/s.</p>"
    learn.innerHTML += "<p>Mass(m): " + parseFloat(massOfBlock).toFixed(2) + " kg.</p>"
    var temp = "2";
    learn.innerHTML += "<p>Force(f): " + parseFloat(net_force_in_pos).toFixed(2) + " kg.m/s" + temp.sup() + ".</p>";
    learn.innerHTML += "<p>Acceleration(a): " + parseFloat(net_acc_in_pos).toFixed(2) + " m/s" + temp.sup() + ".</p>";
    learn.innerHTML += "<p>Time(t): " + parseFloat(time_elapsed).toFixed(2) + "</p>";
    document.body.appendChild( learn );
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

/*----------------------  Functions to add Surface, Block and Hammer  ------------------*/
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

    var tablelegGeom = new THREE.CubeGeometry( 0.5, 40, 0.5, 4, 4, 1 );
    var tableleg =  new THREE.Mesh( tablelegGeom,new THREE.MeshBasicMaterial({color: 0x3A281E}));
    tableleg.position.set(-10.5,-20,10.5);
    
    var edges2 = new THREE.EdgesGeometry( tablelegGeom );
    var line2 = new THREE.LineSegments( edges2, new THREE.LineBasicMaterial( { color: 0x000 } ) );
    
    tableleg.add(line2);
    group.add(tableleg); 

    var tablelegGeom2 = new THREE.CubeGeometry( 0.5, 40, 0.5, 4, 4, 1 );
    var tableleg2 =  new THREE.Mesh( tablelegGeom2,new THREE.MeshBasicMaterial({color: 0x3A281E}));
    tableleg2.position.set(10.5,-20,10.5);
    
    var edges3 = new THREE.EdgesGeometry( tablelegGeom2 );
    var line3 = new THREE.LineSegments( edges3, new THREE.LineBasicMaterial( { color: 0x000 } ) );
    
    tableleg2.add(line3);
    group.add(tableleg2); 


    var tablelegGeom3 = new THREE.CubeGeometry( 0.5, 39, 0.5, 4, 4, 1 );
    var tableleg3 =  new THREE.Mesh( tablelegGeom3,new THREE.MeshBasicMaterial({color: 0x3A281E}));
    tableleg3.position.set(-9.1,-20,-9.1);
    
    var edges4 = new THREE.EdgesGeometry( tablelegGeom3 );
    var line4 = new THREE.LineSegments( edges4, new THREE.LineBasicMaterial( { color: 0x000 } ) );
    
    tableleg3.add(line4);
    group.add(tableleg3);


    var tablelegGeom4 = new THREE.CubeGeometry( 0.5, 39, 0.5, 4, 4, 1 );
    var tableleg4 =  new THREE.Mesh( tablelegGeom4,new THREE.MeshBasicMaterial({color: 0x3A281E}));
    tableleg4.position.set(9.1,-20,-9.1);
    
    var edges5 = new THREE.EdgesGeometry( tablelegGeom4 );
    var line5 = new THREE.LineSegments( edges5, new THREE.LineBasicMaterial( { color: 0x000 } ) );
    
    tableleg4.add(line5);
    group.add(tableleg4); 
    PIEaddElement(group); 
}

function addBlock()
{
    PIEremoveElement(block);
    cuboidMaterial = new THREE.MeshBasicMaterial({color: 0xB07B5A, side: THREE.DoubleSide, shading: THREE.FlatShading});
    mainCuboid1 = new THREE.Mesh( new THREE.CubeGeometry(4 , 1, 4),  cuboidMaterial);
    mainCuboid1.position.set(0, 0, 0);
    
    edges = new THREE.EdgesGeometry( new THREE.BoxBufferGeometry(4, 1, 4) );
    block = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000 } ) );
    block.position.set(0, 1, 2);

    block.add(mainCuboid1);
    PIEaddElement(block);
    PIEdragElement(block);
    PIEsetDrag(block, blockDrag);
}

function addHammer()
{
    PIEremoveElement(handle);
    var geometry = new THREE.CylinderGeometry( 1, 1, 3, 32, 1, false);
    var material = new THREE.MeshBasicMaterial( {color: 0x966F33} );
    hammer = new THREE.Mesh( geometry, material );

    edges = new THREE.EdgesGeometry( new THREE.CylinderGeometry(1, 1, 3) );
    var hammer_lines = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000 } ) );

    var geometry = new THREE.CylinderGeometry( 0.5, 0.5, 3, 20);
    // geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, 3/2 ) );
    var material = new THREE.MeshBasicMaterial( {color: 0x966F33} );
    handle = new THREE.Mesh( geometry, material );

    edges = new THREE.EdgesGeometry( new THREE.CylinderGeometry(0.5, 0.5, 3) );
    var handle_lines = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000 } ) );    

    handle.position.x = 10;
    handle.rotation.y = Math.PI/2;
    hammer_lines.rotation.z = Math.PI/2;

    hammer.position.y = -2;
    hammer.rotation.z = Math.PI/2;
    hammer_lines.position.y = -2;

    handle.add(handle_lines);
    handle.add( hammer_lines );
    handle.add(hammer);
    handle.position.set(0, 5, 0);
    
    handle.rotation.y = 0;
    handle.rotation.z = 0;

    PIEaddElement( handle );
    PIEdragElement(handle);
    PIEsetDrag(handle, handleDrag);
}

/*----------------------  Function to handle drag (both rotational and horizonatal).  ------------------*/
function handleDrag(element, newpos)
{   
    if(!started)
    {
        if(!hingeFixed)
        {
            if(!checkCollision(newpos, 1))
            {
                handle.position.z = newpos.z;
                handle.position.x = newpos.x;
            }
            if(newpos.y >= 3.6 && !checkCollision(newpos, 1))
            {
                handle.position.z = newpos.z;
                handle.position.y = newpos.y;
            }
        }
        else
        {
            if(clockWise && !checkCollision(newpos, 0))
            {
                handle.position.z = newpos.z;
                handle.rotation.z += 0.02;
            }
            else if(!checkCollision(newpos, 0))
            {
                handle.position.z = newpos.z;
                handle.rotation.z -= 0.02;
            }
            else if(checkCollision(newpos, 0))
            {
                if(clockWise)
                {
                    if(handle.rotation.z > 0)
                        handle.rotation.z -= 0.02;
                    else
                        handle.rotation.z += 0.02;
                }
                else
                {
                    if(handle.rotation.z > 0)
                        handle.rotation.z -= 0.02;
                    else
                        handle.rotation.z += 0.02;
                }
            }
            handle.rotation.z = (handle.rotation.z)%(2*Math.PI);
            storedAngle1 = handle.rotation.z;
        }
    }
}

/*----------------------  Function to handle block drag.  ------------------*/
function blockDrag(element, newpos)
{
    if(Math.abs(newpos.x) < 9.67 && !checkCollisionBlock(newpos))
    {
        initialPosition = newpos.x;
        block.position.x = newpos.x;
    }
}

/*----------------------  Functions to check collision between hammer and block.  ------------------*/
function checkCollision(newpos, side)
{
    var firstObject = new THREE.Box3().setFromObject(block);
    var x1 = handle.position.x;
    var x2 = handle.position.y;
    var x3 = handle.position.z;
    handle.position.x = newpos.x;
    handle.position.y = newpos.y;
    handle.position.z = newpos.z;
    var secondObject;
    if(side == 1)
        secondObject = new THREE.Box3().setFromObject(handle);
    else
        secondObject = new THREE.Box3().setFromObject(hammer);

    var collision = firstObject.intersectsBox(secondObject);

    handle.position.x = x1;
    handle.position.y = x2;
    handle.position.z = x3;
    return collision;
}

function checkCollisionBlock(newpos)
{
    var firstObject = new THREE.Box3().setFromObject(handle);
    var x1 = block.position.x;
    var x2 = block.position.y;
    var x3 = block.position.z;
    block.position.x = newpos.x;
    block.position.y = newpos.y;
    block.position.z = newpos.z;
    var secondObject = new THREE.Box3().setFromObject(block);

    var collision = firstObject.intersectsBox(secondObject);

    block.position.x = x1;
    block.position.y = x2;
    block.position.z = x3;
    return collision;
}

/*----------------------  Function to resize rendering when window is resized  ------------------*/
window.onresize = function(){
    renderer.setSize(window.innerWidth,window.innerHeight);
    var aspectRatio = window.innerWidth/window.innerHeight;
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();
}

/*----------------------  Function to calculate nett. force and acceleration in +X direction.  ------------------*/
function calculate()
{
    net_force_in_pos = massOfHammer*acc_of_hammer*Math.cos(handle.rotation.z);
    net_force_in_pos = net_force_in_pos/5;
    net_acc_in_pos = net_force_in_pos/massOfBlock;
    if(handle.rotation.z < 0)
    {
        net_acc_in_pos *= -1;
        net_force_in_pos *= -1;
    }
    var str = "2";
    if(!learn_started)
        net_acc_in_pos_div.innerHTML = "Acceleration: " + net_acc_in_pos.toFixed(2) + " m/s" + str.sup() + ".";
}

/*----------------------  Helper function which starts clock and animation and also calls calculate()  ------------------*/
function startExperiment()
{
    ++reseted;
    ++started;
    startClock(0);
    ++temp;

    if(reseted == 1)
    {
        if(Math.abs(handle.rotation.z) > Math.PI)
        {
            if(handle.rotation.z > 0)
            {
                handle.rotation.z = -1*(2*Math.PI - handle.rotation.z);
            }
            else
            {
                handle.rotation.z = 2*Math.PI + handle.rotation.z;
            }
        }
        storedAngle = handle.rotation.z;
        if(storedAngle == 0)
            storedAngle = storedAngle1;
    }

    PIEstartAnimation();
}

/*----------------------  Helper function which stops clock.  ------------------*/
function stopClock()
{
    clockTime += myClock.getElapsedTime();
    myClock.stop();
    myClock1.stop();
}

/*----------------------  Helper function which starts clock.  ------------------*/
function startClock(a)
{
    PIEremoveDragElement(block);
    hingeFixed = 1;
    if(a == 0)
        myClock.start();
    else
        myClock1.start();
}

/*---------------------- Function to hide Items when info or help tab opens.  ------------------*/
function hideItems()
{
    timeElapsed.style.display = 'none';
    net_acc_in_pos_div.style.display = 'none';
    Velocity_div.style.display = 'none';
    learn.style.display = 'none';
}

/*---------------------- Function to show Items when info or help tab dismisses.  ------------------*/
function showItems()
{
    timeElapsed.style.display = 'block';
    net_acc_in_pos_div.style.display = 'block';
    Velocity_div.style.display = 'block';
    learn.style.display = 'block';
}

function loadExperimentElements()
{
    PIEsetExperimentTitle("Newton's Second Law");
    PIEsetDeveloperName("Harshit Jain");

    initialiseVariables();
    initialiseOtherVariables();
    initialiseScene();

    addSurface();
    addBlock();
    addHammer();

    PIEdragElement(mainCuboid);

    initialiseHelp();
    initialiseInfo();

    document.getElementById("start").addEventListener('click', startExperiment);
    document.getElementById("stop").addEventListener('click', stopClock);
    document.getElementById("pause").addEventListener('click', stopClock);
    document.getElementById("Learn").addEventListener('click', removeItems);
    document.getElementById("info").addEventListener('click', hideItems);
    document.getElementById("help").addEventListener('click', hideItems);
    document.body.addEventListener('click', showItems, true); 

    PIEsetAreaOfInterest(15, -15, -15, 15);
}

function resetExperiment()
{
    if(ended)
        document.body.removeChild(learn);
    addBlock();
    PIEdragElement(block);
    PIEsetDrag(block, blockDrag);
    addSurface();
    PIEchangeInputSlider("Position", 0);
    PIEchangeDisplayCheckbox("FixHammer", false);
    PIEchangeInputCheckbox("FixHammer", false);
    PIEchangeDisplayCheckbox("Rotate ClockWise", false);
    PIEchangeInputCheckbox("Rotate ClockWise", false);
    addHammer();
    massOfBlock = 1;
    Velocity = 0;
    collided = 0;
    ++sta;
    initialPosition = 0;
    hingeFixed = 0;
    time_elapsed = 0;
    reseted = 0;
    started = 0;
    verticalVelocity = 0;
    learn_started = 0;
    temp1 = 0;
    clockTime = 0;
    storedAngle = 0;
    count = 0;
    ended = 0;
    clockWise = 0;
    stopClicked = 0;
    initialPositionY = 1;
    clockTime = 0;
    acc_of_hammer = 0;
    net_force_in_pos = 0;
    net_acc_in_pos = 0;
    initialiseOtherVariables();
    document.getElementById("start").addEventListener('click', startClock);
}

function updateExperimentElements(t, dt)
{
    if(Math.abs(block.position.x) <= 13.6 && collided)
    {
        var c = clockTime + myClock.getElapsedTime();
        time_elapsed = c.toFixed(2);
        timeElapsed.innerHTML = "Time Elapsed: " + time_elapsed + " s."
        if(temp > 0)
            block.position.x = initialPosition + (1/2)*net_acc_in_pos*c*c + Velocity*c;
        Velocity = net_acc_in_pos*c;
        stored_final_velocity = Velocity.toFixed(2);
        Velocity_div.innerHTML = "Velocity: " + stored_final_velocity + " m/s.";
    }
    else if(Math.abs(block.position.y) <= 20 && collided)
    {
        if(temp1 == 0)
            startClock(1);
        ++temp1;
        var c = myClock1.getElapsedTime();
        block.position.y = initialPositionY + (1/2)*verticalAcc*c*c + verticalVelocity*c;
        verticalVelocity = verticalAcc*c;
        c = clockTime + myClock.getElapsedTime();
        if(temp > 0)
            block.position.x = initialPosition + (1/2)*net_acc_in_pos*c*c + Velocity*c;
        Velocity = net_acc_in_pos*c;
        if(Math.abs(block.position.y) >= 20)
        {
            ++ended;
        }
    }
    else if(!collided)
    {
        var c = clockTime + myClock.getElapsedTime();
        var oldpos = handle;
        handle.rotation.z = (storedAngle)*Math.cos(Math.sqrt(9.8/2)*(c));
        var acc = Math.sqrt(2*9.8*2*Math.abs(Math.cos(handle.rotation.z) - Math.cos(storedAngle)));
        if(checkCollision(handle.position, 0))
        {
            collided = 1;
            handle = oldpos;
            acc_of_hammer = acc;
            calculate();
        }
    }
}
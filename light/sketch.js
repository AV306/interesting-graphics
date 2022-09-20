var s;
var picker;
var clampCheckbox;

const w = 800;
const h = 800;
const hW = w / 2;
const hH = h/2;

function preload()
{
  s = loadShader(
    "shaders/light.vert",
    "shaders/light.frag"
  );
}

function setup()
{
  createCanvas( w, h, WEBGL );
  angleMode( DEGREES );
  
  frameRate( 60 );
  
  noStroke();
  
  picker = createColorPicker( "#FF00FF" );
  picker.position( 0, 0 );
  
  clampCheckbox = createCheckbox( "Clamp color", true );
  clampCheckbox.position( 40, 6 );
}

var dt;
var intensity;

function draw()
{
  dt = deltaTime / 100;
  background( 220 );
  
  var dX = mouseX / w;
  var dY = mouseY / h;
  
  s.setUniform( "shouldClamp", clampCheckbox.checked() );
  s.setUniform( "size", 6.0 );
  s.setUniform( "lightPos", [dX, dY] );
  s.setUniform( "lightColor", picker.color()._array );
  s.setUniform( "lightIntensity", 0.2 );
  s.setUniform( "time", frameCount / 10 );
  
  shader( s );
  rect( -hW, -hH, w, h );
}

function wrapDegrees( deg )
{
  if ( deg > 360 ) deg -= 360;
  else if ( deg < 360 ) deg += 360;
  return deg;
}

function mouseScroll( event )
{
  intensity += event.delta;
  clamp( intensity, 0.05, 1.0 );
  
  return false;
}

function keyPressed( event )
{
  clampCheckbox.value(  !clampCheckbox.checked() );
  return false;
}

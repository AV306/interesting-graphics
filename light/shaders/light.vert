precision mediump float;

attribute vec3 aPosition;
attribute vec2 aTexCoord;

uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;
uniform float time;

varying vec2 vTexCoord;

void main()
{
  vTexCoord = aTexCoord; // Copy the texCoord
  
  //float yMod = sin( aPosition.y + time ) * 20.0;
  
  // Convert the vertex position to a homogeneous coordinate
  //vec4 position = vec4( aPosition.x, aPosition.y, aPosition.z +  yMod, 1.0 );
  vec4 position = vec4( aPosition, 1.0 );
  
  // Apply the projection matrix and
  // modelview matrix to the position
  gl_Position = uProjectionMatrix * uModelViewMatrix * position;
}
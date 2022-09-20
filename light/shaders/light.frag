precision mediump float;

varying vec2 vTexCoord;

uniform bool shouldClamp;
uniform float size;
uniform vec2 lightPos;
uniform float lightIntensity;
uniform vec3 lightColor;
uniform float time;
uniform sampler2D sampler;

void wave( bool alpha )
{
  vec2 scaledTexCoord = vTexCoord * size;
  vec2 scaledLightPos = lightPos * size;
  
  float wave = sin( time + scaledTexCoord.x * scaledTexCoord.y ) * 2.0;
  
  float squaredDistance = pow( distance( scaledTexCoord, scaledLightPos ) + wave, 2.0 );
  
  float intensity = 1.0 / squaredDistance;
  
  if ( alpha && intensity < 5.0 ) discard;
  gl_FragColor = vec4( lightColor * lightIntensity * intensity, 1.0 );
}

void light()
{
  vec2 scaledTexCoord = vTexCoord * size;
  vec2 scaledLightPos = lightPos * size;
  
  float squaredDistance = pow( distance( scaledTexCoord, scaledLightPos ), 2.0 );
  
  float intensity = 1.0 / squaredDistance;
  
  vec3 finalColor = lightColor * lightIntensity * intensity;
  
  if ( shouldClamp )
    finalColor = clamp(
      finalColor,
      vec3( 0.0, 0.0, 0.0 ),
      lightColor
    );
  
  gl_FragColor = vec4( finalColor, 1.0 );
}

void test()
{
  vec4 color = texture2D( sampler, vTexCoord );
  
  if (
    color.x < 0.1 &&
    color.y < 0.1 &&
    color.z < 0.1
  ) discard;
  
  gl_FragColor = color;
}

void main()
{
  //wave( false );
  light();
}
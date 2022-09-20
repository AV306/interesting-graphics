function clamp( v, min, max )
{
  if ( v < min ) v = min;
  else if ( v > max ) v = max;
  
  return v;
}
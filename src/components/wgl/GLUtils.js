
export const SpotLightProgram = {
  vertexShader: `#version 300 es
  precision mediump float;
  
  layout (location=0) in vec3 position;
  layout (location=1) in vec2 uvcoord;
  layout (location=2) in vec3 normal;
  
  
  out vec2 uvcoord_out;
  out vec3 vPos;
  out vec3 vNorm;
  
  void main()
  {
  
    //intentional inverting
    uvcoord_out.x = uvcoord.x;
    uvcoord_out.y = 1.0-uvcoord.y;
    vPos=position;
    vNorm = normalize(normal);
    gl_Position = vec4(position,1.0);
  
  }`,
  fragmentShader: `#version 300 es
  precision mediump float;
  
  out vec4 fragColor;
  in vec2 uvcoord_out;
  in vec3 vPos;
  in vec3 vNorm;
  
  uniform sampler2D sampler;
  uniform vec3 lightPos;
  uniform float linear;
  uniform float quadratic;
  uniform float bFactor;
  //uniform float cutOff;
  //uniform float outerCutOff;
  uniform float intensity;
  
  
  vec3 rgb2hsv(vec3 c)
  {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
  
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
  }
  
  vec3 hsv2rgb(vec3 c)
  {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }
  
  vec3 getSpotLightColor(vec3 mColor)
  {
    vec3 lightPosition=lightPos;
    vec3 lightDiffuse=vec3(0.5f);
    vec3 lightDir=vec3(0,0,-1);
    float cutOff=12.5;
    float outerCutOff=17.5;
  
    //attenuation
    float dist = length(lightPosition-vPos);
    float attenuation = 1.0/(1.0+ (linear*dist) + (quadratic*(dist*dist)));
    //float theta = dot((lightPosition-vPos), normalize(-lightDir)); 
    //float epsilon = (cutOff - outerCutOff);
    //float attenuation = clamp((theta - outerCutOff) / epsilon, 0.0, 1.0);
  
  
    //ambient
    vec3 ambient = vec3(intensity)*mColor;
    ambient*=attenuation;
  
    //diffuse
    vec3 norm = normalize(vNorm);
    vec3 dir = normalize(lightPosition - vPos);
    float diff = max(dot(norm,dir),0.0);
    vec3 diffuse = lightDiffuse*(diff*mColor);
    diffuse*=attenuation;
  
  
    return ambient+diffuse;
  }
  
  
  void main()
  {
    vec4 tColor= texture(sampler,uvcoord_out);
    float rgb_avg = (tColor.r+tColor.g+tColor.b)/3.0;
    vec3 avg_color = vec3(rgb_avg,rgb_avg,rgb_avg);
    vec3 blend = mix(tColor.rgb,avg_color,bFactor);
    blend=getSpotLightColor(blend);
  
    fragColor =vec4(blend,tColor.a);
  
  }
  `
};

export const FSQuadProgram = {
  vertexShader: `#version 300 es
  precision mediump float;
  
  layout (location=0) in vec3 position;
  layout (location=1) in vec2 uvcoord;
  
  
  out vec2 uvcoord_out;
  out vec3 vPos;
  
  void main()
  {
  
    //intentional inverting
    uvcoord_out.x = uvcoord.x;
    uvcoord_out.y = 1.0-uvcoord.y;
    vPos=position;
    gl_Position = vec4(position,1.0);
  
  }`,
  fragmentShader: `#version 300 es
  precision mediump float;
  
  out vec4 fragColor;
  in vec2 uvcoord_out;
  in vec3 vPos;
  
  uniform sampler2D sampler;
  uniform vec3 color;
      
  void main()
  {
    vec4 tColor= texture(sampler,uvcoord_out);
  
    fragColor =tColor;
  
  }
  `
};

export function createBuffer(gl, type, data, iData) {
  const buffer = gl.createBuffer();
  gl.bindBuffer(type, buffer);
  if (iData === null)
    gl.bufferData(type, data, gl.STATIC_DRAW);
  else if (data === null)
    gl.bufferData(type, iData, gl.STATIC_DRAW);
  gl.bindBuffer(type, null);

  return buffer;
}

export function getFullscreenQuad(gl) {
  let vao = gl.createVertexArray();
  const positionArray = new Float32Array([
    -1, -1, 0,
    1, -1, 0,
    1, 1, 0,
    -1, 1, 0
  ]);
  // const normalArray = new Float32Array([
  //   0, 0, 1,
  //   0, 0, 1,
  //   0, 0, 1,
  //   0, 0, 1,
  // ]);
  const uvArray = new Float32Array([
    0, 0,
    1, 0,
    1, 1,
    0, 1
  ]);

  const iArr = new Uint32Array([0, 1, 2, 0, 2, 3]);

  const positionBuffer = createBuffer(gl, gl.ARRAY_BUFFER, positionArray, null);
  //const normalBuffer = createBuffer(gl, gl.ARRAY_BUFFER, normalArray, null);
  const uvBuffer = createBuffer(gl, gl.ARRAY_BUFFER, uvArray, null);
  const indexBuffer = createBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, null, iArr);

  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
  gl.enableVertexAttribArray(1);
  gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);
  // gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  // gl.enableVertexAttribArray(2);
  // gl.vertexAttribPointer(2, 3, gl.FLOAT, false, 0, 0);
  gl.bindVertexArray(null);


  let mesh = {};
  mesh.vao = vao;
  mesh.ibo = indexBuffer;
  mesh.drawCount = iArr.length;
  mesh.drawCommand = gl.TRIANGLES;
  return mesh;

}

export function createTexture(gl) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([0, 0, 255, 255]); // opaque blue
  gl.texImage2D(
    gl.TEXTURE_2D,
    level,
    internalFormat,
    width,
    height,
    border,
    srcFormat,
    srcType,
    pixel
  );

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  return texture;
}

export function updateTexture(gl, texture, video) {
  const level = 0;
  const internalFormat = gl.RGBA;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    level,
    internalFormat,
    srcFormat,
    srcType,
    video
  );
}
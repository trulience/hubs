export default class GLProgram {

  _gl;
  _vShaderSource;
  _fShaderSource;
  _program;

  constructor(gl, vsrc, fsrc) {
    this._gl = gl;
    this._vShaderSource = vsrc;
    this._fShaderSource = fsrc;
    this.prepare();
  }

  createShader = (type, src) => {
    const shader = this._gl.createShader(type);
    this._gl.shaderSource(shader, src);
    this._gl.compileShader(shader);
    const log = this._gl.getShaderInfoLog(shader);
    if (log.length > 0) {
      let err = "";
      if (type === this._gl.VERTEX_SHADER) err += "Vertex Shader";
      else if (type === this._gl.FRAGMENT_SHADER) err += "Fragment Shader";
      console.error(err, log);
      this._gl.deleteShader(shader);
      return 0;
    }

    return shader;
  }

  prepare() {

    const vShader = this.createShader(this._gl.VERTEX_SHADER, this._vShaderSource);
    const fShader = this.createShader(this._gl.FRAGMENT_SHADER, this._fShaderSource);

    if (vShader === 0 || fShader === 0) {
      console.error("Failed to create program");
      return;
    }

    this._program = this._gl.createProgram();

    this._gl.attachShader(this._program, vShader);
    this._gl.attachShader(this._program, fShader);

    this._gl.linkProgram(this._program);

    const pLog = this._gl.getProgramInfoLog(this._program);
    if (pLog.length > 0) {
      console.error("Program linking error", pLog);
      this._gl.deleteProgram(this._program);
      this._program = 0;
    }

    this._gl.deleteShader(vShader);
    this._gl.deleteShader(fShader);
  }
  bind() {
    this._gl.useProgram(this._program);
  }

  unbind() {
    this._gl.useProgram(null);
  }

}
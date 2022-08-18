// Inspired by Version 0.0.0. Copyright 2017 Mike Bostock

export class Versor{
    constructor(){ // I had e in here
        this.acos = Math.acos,
        this.asin = Math.asin,
        this.atan2 = Math.atan2,
        this.cos = Math.cos,
        this.max = Math.max,
        this.min = Math.min,
        this.PI = Math.PI,
        this.sin = Math.sin,
        this.sqrt = Math.sqrt,
        this.radians = this.PI / 180,
        this.degrees = 180 / this.PI;
    }

   // Returns the unit quaternion for the given Euler rotation angles [λ, φ, γ].
    versor(e){
        let l = e[0] / 2 * this.radians, 
            p = e[1] / 2 * this.radians, 
            g = e[2] / 2 * this.radians, 
            sl = this.sin(l), 
            cl = this.cos(l),
            sp = this.sin(p), 
            cp = this.cos(p),
            sg = this.sin(g), 
            cg = this.cos(g);

        return [
            cl * cp * cg + sl * sp * sg,
            sl * cp * cg - cl * sp * sg,
            cl * sp * cg + sl * cp * sg,
            cl * cp * sg - sl * sp * cg
        ];
    }

    // Returns Cartesian coordinates [x, y, z] given spherical coordinates [λ, φ].
    cartesian(e) {
        let l = e[0] * this.radians, p = e[1] * this.radians,
            cp = this.cos(p);
        return [cp * this.cos(l), cp * this.sin(l), this.sin(p)];
      }

    // Returns the Euler rotation angles [λ, φ, γ] for the given quaternion.
    rotation(q) {
        return [
       this.atan2(2 * (q[0] * q[1] + q[2] * q[3]), 1 - 2 * (q[1] * q[1] + q[2] * q[2])) * this.degrees,
       this.asin(this.max(-1, this.min(1, 2 * (q[0] * q[2] - q[3] * q[1])))) * this.degrees,
       this.atan2(2 * (q[0] * q[3] + q[1] * q[2]), 1 - 2 * (q[2] * q[2] + q[3] * q[3])) * this.degrees
        ];
    }

    // Returns the quaternion to rotate between two cartesian points on the sphere.
    delta(v0, v1) {
        let w = this.cross(v0, v1), l = this.sqrt(this.dot(w, w));
        if (!l) return [1, 0, 0, 0];
        let t = this.acos(this.max(-1, this.min(1, this.dot(v0, v1)))) / 2, s = this.sin(t);
        return [this.cos(t), w[2] / l * s, -w[1] / l * s, w[0] / l * s];
    }

    
    // Returns the quaternion that represents q0 * q1.
    multiply(q0, q1) {
        return [
          q0[0] * q1[0] - q0[1] * q1[1] - q0[2] * q1[2] - q0[3] * q1[3],
          q0[0] * q1[1] + q0[1] * q1[0] + q0[2] * q1[3] - q0[3] * q1[2],
          q0[0] * q1[2] - q0[1] * q1[3] + q0[2] * q1[0] + q0[3] * q1[1],
          q0[0] * q1[3] + q0[1] * q1[2] - q0[2] * q1[1] + q0[3] * q1[0]
        ];
    }

    cross(v0, v1) {
        return [
          v0[1] * v1[2] - v0[2] * v1[1],
          v0[2] * v1[0] - v0[0] * v1[2],
          v0[0] * v1[1] - v0[1] * v1[0]
        ];
    }

    dot(v0, v1) {
        return v0[0] * v1[0] + v0[1] * v1[1] + v0[2] * v1[2];
    }
}



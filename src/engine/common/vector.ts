class Vector2d {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  setX(x: number) {
    this.x = x;
  }

  setY(y: number) {
    this.y = y;
  }

  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize(): Vector2d {
    const magnitude = this.magnitude();
    if (magnitude === 0) {
      return new Vector2d(1, 0);
    } else {
      return this.divide(new Vector2d(magnitude, magnitude));
    }
  }

  perpendicular(): Vector2d {
    return new Vector2d(-this.y, this.x);
  }

  projection(vec: Vector2d): Vector2d {
    const coeff = this.dotProduct(vec) / vec.magnitude();
    return new Vector2d(coeff * this.getX(), coeff * this.getY());
  }

  divide(vec: Vector2d): Vector2d {
    return new Vector2d(this.x / vec.getX(), this.y / vec.getY());
  }

  subtract(vec: Vector2d): Vector2d {
    return new Vector2d(vec.getX() - this.x, vec.getY() - this.y);
  }
  add(vec: Vector2d): Vector2d {
    return new Vector2d(this.x + vec.getX(), this.y + vec.getY());
  }

  dotProduct(vec: Vector2d): number {
    const dot = this.x * vec.getX() + this.y * vec.getY();
    return dot;
  }

  crossProduct(vec: Vector2d): number {
    return vec.getX() * this.y - this.x * vec.getY();
  }
}

export default Vector2d;

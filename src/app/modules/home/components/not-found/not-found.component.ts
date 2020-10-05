import { Component, OnInit, AfterViewInit, HostListener, ElementRef } from '@angular/core';
import { AuthService } from '../../../../auths';
import { SeoService } from '../../../../services';
import * as $ from 'jquery'

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit, AfterViewInit {
  constructor(private element: ElementRef, private auth: AuthService, seo: SeoService) {
    seo.set('404')
  }
  _eye: any
  _color: Array<number>
  _lids: any;
  _iris: {
    ref: any,
    x: number,
    y: number,
    w: number,
    h: number,
    color: string,
    lerp: number
  };
  _pupil: {
    ref: any,
    x: number,
    y: number,
    w: number,
    h: number,
    size: number,
    sizeGoal: number,
    lerp: number
  };
  _mouse: {
    x: number,
    y: number,
    oldX: number,
    oldY: number
  };
  _lid_top: {
    pos: number,
    posGoal: number,
    goalPos?: number,
    relaxed: number,
    surprised: number,
    angry: number,
    playful: number,
    bored: number,
    tired: number,
    squint: number,
    lerp: number,
    modifier: number
  };
  _lid_bottom: {
    pos: number,
    posGoal: number,
    goalPos?: number,
    relaxed: number,
    surprised: number,
    angry: number,
    playful: number,
    bored: number,
    tired: number,
    squint: number,
    lerp: number,
    modifier: number
  };
  _blink_timer: number = 0;
  _blink_flag: boolean = false;
  _anger: number = 0;
  _distraction_timer: number = 0;
  _distracted_flag: boolean = true;
  _xp: number;
  _yp: number;
  _wake_timer: number;
  _boredom: number;
  _shock: number;
  _lid_max: number

  get _skin_color() {
    return this._lids.css('border-top-color');
  }

  get _distance_threshold() {
    return this._eye.width() / 2 - this._r;
  }

  get _r() {
    return this._iris.w / 2;
  }

  get _center() {
    return {
      x: this._eye.width() / 2 - this._r,
      y: this._eye.height() / 2 - this._r
    }
  };

  ngOnInit() {
    this._blink_timer = 0;
    this._blink_flag = false;
    this._anger = 0;
    this._distraction_timer = 0;
    this._distracted_flag = true;
    this._xp = 45;
    this._yp = 55;
    this._boredom = 0;
    this._shock = 0;
    this._lid_max = 76;
    this._wake_timer = this.random(240, 720);
    this._mouse = {
      x: 50,
      y: 50,
      oldX: 50,
      oldY: 50
    }
    this._lid_top = {
      pos: 25,
      posGoal: 25,
      relaxed: 25,
      surprised: 10,
      angry: 70,
      playful: 10,
      bored: 55,
      tired: 70,
      squint: 60,
      lerp: 0,
      modifier: 1
    };
    this._lid_bottom = {
      pos: 25,
      posGoal: 25,
      relaxed: 25,
      surprised: 10,
      angry: 30,
      playful: 50,
      bored: 15,
      tired: 55,
      squint: 65,
      lerp: 0,
      modifier: 1
    };
  }

  ngAfterViewInit() {
    this.init()
  }

  @HostListener('window:mousemove', ['$event']) _mousemove(e) {
    this._distracted_flag = false;
    var eyeposx = parseInt(this._eye.css('left'));
    var eyeposy = parseInt(this._eye.css('top'));

    var d = {
      x: e.pageX - this._r - eyeposx - this._center.x,
      y: e.pageY - this._r - eyeposy - this._center.y
    };
    var distance = Math.sqrt(d.x * d.x + d.y * d.y);
    if (distance < this._distance_threshold) {
      this._mouse.x = e.pageX - eyeposx - this._r;
      this._mouse.y = e.pageY - eyeposy - this._r;
    }
    else {
      this._mouse.x = d.x / distance * this._distance_threshold + this._center.x;
      this._mouse.y = d.y / distance * this._distance_threshold + this._center.y;
    }

    // make eyelids close more the closer the mouse gets to them
    var lidModifier = (distance / 50);
    if (distance > 50) {
      lidModifier = 1;
    }
    else {
      // decrease blink interval if moving over eye
      this._blink_timer -= 3;
    }
    if (lidModifier < 0.8) {
      lidModifier = 0.8;
    }

    this._lid_top.modifier = lidModifier;
    this._lid_bottom.modifier = lidModifier;

    // pupil "focuses" the closer the mouse is
    if (distance < 100) {
      this._pupil.sizeGoal = lidModifier * 30;
    }
    else {
      this._pupil.sizeGoal = 30;
    }
    this._boredom -= 1;
  }

  isAuth() {
    return this.auth.isAuth()
  }

  init() {
    const element: HTMLElement = this.element.nativeElement;
    this._eye = $(element.querySelector('.eye'));
    const rgbs = this._eye.css("background-color").replace(/[^\d,.]/g, "").split(",");
    this._color = [
      parseInt(rgbs[0]),
      parseInt(rgbs[1]),
      parseInt(rgbs[2])
    ];
    this._lids = $(element.querySelector('.lids'));
    const iris = $(element.querySelector('.iris'));
    this._iris = {
      ref: iris,
      x: parseInt(iris.css('left')),
      y: parseInt(iris.css('top')),
      w: parseInt(iris.css('width')),
      h: parseInt(iris.css('height')),
      color: iris.css('background-color'),
      lerp: 0
    };
    const pupil = $(element.querySelector('.pupil'));
    this._pupil = {
      ref: pupil,
      x: parseInt(pupil.css('left')),
      y: parseInt(pupil.css('top')),
      w: parseInt(pupil.css('width')),
      h: parseInt(pupil.css('height')),
      size: 30,
      sizeGoal: 30,
      lerp: 0
    };
    this.animate();
  }

  animate() {
    this._blink_timer -= 1 + this._anger / 50;
    if (this._blink_timer <= 0) {
      this._blink_timer = this.random(120, 600);
      this._blink_flag = true;
    }

    this._distraction_timer -= 1;

    if (this._distraction_timer <= 0) {
      this._distraction_timer = this.random(60, 120);

      if (this._distracted_flag == true) {
        var eyeposx = parseInt(this._eye.css('left'));
        var eyeposy = parseInt(this._eye.css('top'));
        var tempX = this.random((this._mouse.x + eyeposx + this._r) - 200, (this._mouse.x + eyeposx + this._r) + 200);
        var tempY = this.random((this._mouse.y + eyeposx + this._r) - 200, (this._mouse.y + eyeposx + this._r) + 100);

        var d = {
          x: tempX - this._r - eyeposx - this._center.x,
          y: tempY - this._r - eyeposy - this._center.y
        };
        var distance = Math.sqrt(d.x * d.x + d.y * d.y);
        if (distance < this._distance_threshold) {
          this._mouse.x = tempX - eyeposx - this._r;
          this._mouse.y = tempY - eyeposy - this._r;
        }
        else {
          this._mouse.x = d.x / distance * this._distance_threshold + this._center.x;
          this._mouse.y = d.y / distance * this._distance_threshold + this._center.y;
        }
      }
      this._distracted_flag = true;
    }

    this.followMouse();
    this.updateEmotions();
    this.blink();
    this.updateEyeParts();
    this._mouse.oldX = this._mouse.x;
    this._mouse.oldY = this._mouse.y;
    setTimeout(this.animate.bind(this), 16);
  }

  followMouse() {
    var lerpSpeed = 0.12;
    this._xp = this.interpolate(this._xp, this._mouse.x, 0, lerpSpeed);
    this._yp = this.interpolate(this._yp, this._mouse.y, 0, lerpSpeed);

    var distance = Math.sqrt((this._mouse.x - this._mouse.oldX) * (this._mouse.x - this._mouse.oldX) +
      (this._mouse.y - this._mouse.oldY) * (this._mouse.y - this._mouse.oldY));

    if (distance >= 25) {
      this._xp = this.interpolate(this._xp, this._mouse.x, 0, 0.4);
      this._yp = this.interpolate(this._yp, this._mouse.y, 0, 0.4);
    }

    this._iris.x = this._xp;
    this._iris.y = this._yp;
  }

  updateEmotions() {
    this._boredom += 0.1;
    if (this._boredom >= 170) {
      this._boredom = 170;

      this._wake_timer -= 1;
      if (this._wake_timer <= 0) {
        this._wake_timer = this.random(180, 720);
        this._boredom = 0;
      }
    }
    else if (this._boredom <= 0) {
      this._boredom = 0;
    }

    this._anger -= 0.15;
    if (this._anger >= 150) {
      this._anger = 150;
    }
    else if (this._anger <= 0) {
      this._anger = 0;
    }

    this._color[0] = this.interpolate(this._color[0], 245 + this._anger, 0, 0.008);
    this._color[1] = this.interpolate(this._color[1], 240 - this._anger, 0, 0.008);
    this._color[2] = this.interpolate(this._color[2], 240 - this._anger, 0, 0.008);
    this._color.forEach((element, index) => {
      if (this._color[index] >= 255) {
        this._color[index] = 255;
      }
      else if (this._color[index] <= 0) {
        this._color[index] = 0;
      }
    });
  }

  blink() {
    if (this._blink_flag) {
      this._lid_top.pos = this.interpolate(this._lid_top.pos, this._lid_max, this._lid_top.lerp, 0.6);
      this._lid_bottom.pos = this.interpolate(this._lid_bottom.pos, this._lid_max, this._lid_bottom.lerp, 0.6);
    }
    else if (!this._blink_flag) {
      if (this._anger >= 50) {
        this._lid_top.goalPos = this._lid_top.angry / this._lid_top.modifier;
        this._lid_bottom.goalPos = this._lid_bottom.angry / this._lid_bottom.modifier;
      }
      else if (this._shock >= 50) {
        this._lid_top.goalPos = this._lid_top.surprised / this._lid_top.modifier;
        this._lid_bottom.goalPos = this._lid_bottom.surprised / this._lid_bottom.modifier;
      }
      else if (this._boredom >= 150) {
        this._lid_top.goalPos = this._lid_top.goalPos + 1 / this._lid_top.modifier;
        this._lid_bottom.goalPos = this._lid_bottom.goalPos + 1 / this._lid_bottom.modifier;
      }
      else if (this._boredom >= 50) {
        this._lid_top.goalPos = this._lid_top.bored / this._lid_top.modifier;
        this._lid_bottom.goalPos = this._lid_bottom.bored / this._lid_bottom.modifier;
      }
      else {
        this._lid_top.goalPos = this._lid_top.relaxed / this._lid_top.modifier;
        this._lid_bottom.goalPos = this._lid_bottom.relaxed / this._lid_bottom.modifier;
      }

      this._lid_top.pos = this.interpolate(this._lid_top.pos, this._lid_top.goalPos, this._lid_top.lerp, 0.3);
      this._lid_bottom.pos = this.interpolate(this._lid_bottom.pos, this._lid_bottom.goalPos, this._lid_bottom.lerp, 0.3);
    }

    if (this._lid_top.pos >= this._lid_max - 1 && this._lid_bottom.pos >= this._lid_max - 1) {
      this._blink_flag = false;
    }
  }

  updateEyeParts() {
    if (this._lid_top.pos >= this._lid_max) {
      this._lid_top.pos = this._lid_max;
    }
    else if (this._lid_top.pos <= 0) {
      this._lid_top.pos = 0;
    }

    if (this._lid_bottom.pos >= this._lid_max) {
      this._lid_bottom.pos = this._lid_max;
    }
    else if (this._lid_bottom.pos <= 0) {
      this._lid_bottom.pos = 0;
    }

    var rgbString = 'rgb(' + Math.round(this._color[0]) + ',' + Math.round(this._color[1]) + ',' + Math.round(this._color[2]) + ')';
    this._eye.css('background-color', rgbString);

    this._pupil.size = this.interpolate(this._pupil.size, this._pupil.sizeGoal, this._pupil.lerp, 0.03);
    this._pupil.x = this._iris.w / 2 - this._pupil.size / 2;
    this._pupil.y = this._iris.h / 2 - this._pupil.size / 2;

    this._lids.css('border-top', this._lid_top.pos + "px solid " + this._skin_color);

    this._lids.css('border-bottom', this._lid_bottom.pos + "px solid " + this._skin_color);

    this._iris.ref.css('left', this._iris.x + "px");
    this._iris.ref.css('top', this._iris.y + "px");
    this._iris.ref.css('background', this._iris.color);

    this._pupil.ref.css('left', this._pupil.x + "px");
    this._pupil.ref.css('top', this._pupil.y + "px");
    this._pupil.ref.css('width', this._pupil.size + "px");
    this._pupil.ref.css('height', this._pupil.size + "px");
  }


  interpolate(part, goalPos, currentLerp, lerpSpeed) {
    if (part != goalPos) {
      currentLerp = 0;
    }

    if (currentLerp <= 1.0) {
      currentLerp += lerpSpeed;
    }

    part = this.lerp(part, currentLerp, goalPos);

    return part;
  }

  lerp(part, current, pos) {
    return part * (1 - current) + pos * current;
  }

  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

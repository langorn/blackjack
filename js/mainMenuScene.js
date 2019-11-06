var MainMenuScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize:
  function MainMenuScene()
  {
    Phaser.Scene.call(this, { key: 'MainMenuScene'});
  },
  preload: function ()
  {
    this.load.image('background', 'assets/casino/background.jpg');

  },
  create: function ()
  {
    var text;
    var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
    this.add.image(550, 300, 'background')
    text = this.add.text(380, 500, "- CLICK TO START -", style);
    text.setShadow(3, 3, 'rgba(0,0,0.5)', 5);
    this.input.on('pointerdown', this.onStartClicked, this);

  },
  onStartClicked: function ()
  {
    this.scene.switch('GamingScene');
  }
});

export { MainMenuScene };

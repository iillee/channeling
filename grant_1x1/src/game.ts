import * as utils from '@dcl/ecs-scene-utils'

//Material 00 - White
const material00 = new Material()
      material00.albedoColor = Color3.White()
      material00.metallic = 0
      material00.roughness = .5

//Material 01 - Cycles white
const material01 = new Material()
      material01.albedoColor = Color3.White()
      material01.metallic = 0
      material01.roughness = 1

      class ColorSystem1 {
                  fraction:number = 0
                  direction: number = 1

                  update(dt:number){
                      this.fraction += this.direction * dt * 0.25
                      if(this.fraction > 1){
                          this.fraction = 1
                          this.direction = -1

                      } else if(this.fraction < 0){
                        this.fraction = 0
                        this.direction = 1

                    }
                      material01.albedoColor = Color4.Lerp(new Color4(3, 3, 3, 1), new Color4(1.5, 1.5, 1.5, .5), this.fraction)
                  }
              }
engine.addSystem(new ColorSystem1())

//sounds
const clip = new AudioClip("sounds/button.mp3")
const click = new AudioSource(clip)

//Ground Plane
const ground = new Entity()
ground.addComponent(new PlaneShape())
ground.addComponent(material00)
ground.addComponent(
      new Transform({
        position: new Vector3(8, 0, 8),
        scale: new Vector3(16, 16, 1),
        rotation: Quaternion.Euler(90, 90, 0)
    }))
engine.addEntity(ground)

//orb (trigger signifyer)
const orb = new Entity()
orb.addComponent(new SphereShape())
orb.getComponent(SphereShape).withCollisions = false
orb.addComponent(material01)
orb.addComponent(new Transform({
        position: new Vector3(8, 4, 8),
        scale: new Vector3(.5, .5, .5)
}))
engine.addEntity(orb)

// constant base
let base = new Entity()
let basePath:string = "models/base.glb"
    base.addComponent(new GLTFShape(basePath))
    base.addComponent(new Transform({
        position: new Vector3(0, 0, 0),
        scale: new Vector3(1, 1, 1),
        rotation: Quaternion.Euler(0, 180, 0)
}))
engine.addEntity(base)

//Channel 01 - Parent
let channel_01 = new Entity()
    channel_01.addComponent(
        new utils.ToggleComponent(utils.ToggleState.On, value => {
            engine.removeEntity(channel_05),
            engine.addEntity(channel_01)
      })
    )

        //Channel Trigger 01
        const trigger_01 = new Entity()
        trigger_01.addComponent(new PlaneShape())
        trigger_01.getComponent(PlaneShape).withCollisions = false
        trigger_01.getComponent(PlaneShape).visible = false
        trigger_01.addComponent(click)
        trigger_01.addComponent(new Transform({
          position: new Vector3(8, 6.25, 8),
          scale: new Vector3(1, 1, 1),
          rotation: Quaternion.Euler(90, 0, 0)
        }))
        let triggerBox01 = new utils.TriggerBoxShape()
        trigger_01.addComponent(
          new utils.TriggerComponent(
            triggerBox01,
          {
            onCameraExit :() => {
              log('triggered!')
              channel_02.getComponent(utils.ToggleComponent).toggle()}
        }))
        click.playing = true

        //pavillion
        let pavillion = new Entity()
        let pavillionPath:string = "models/pavillion.glb"
            pavillion.addComponent(new GLTFShape(pavillionPath))
            pavillion.addComponent(new Transform({
                position: new Vector3(0, 0, 0),
                scale: new Vector3(1, 1, 1),
                rotation: Quaternion.Euler(0, 180, 0)
        }))

        //Jump Text
        let jump = new Entity()
        let jumpPath:string = "models/jump.glb"
            jump.addComponent(new GLTFShape(jumpPath))
            jump.addComponent(new Transform({
                position: new Vector3(0, 0, 0),
                scale: new Vector3(1, 1, 1),
                rotation: Quaternion.Euler(0, 180, 0)
        }))

//Set parent
trigger_01.setParent(channel_01)
pavillion.setParent(channel_01)
jump.setParent(channel_01)

//specify start state to run when the scene begins
engine.addEntity(channel_01)

//Channel 02 - Parent
let channel_02 = new Entity()
    channel_02.addComponent(
        new utils.ToggleComponent(utils.ToggleState.On, value => {
            engine.removeEntity(channel_01),
            engine.addEntity(channel_02)
      })
    )

      //Channel Trigger 02
      const trigger_02 = new Entity()
      trigger_02.addComponent(new PlaneShape())
      trigger_02.getComponent(PlaneShape).withCollisions = false
      trigger_02.getComponent(PlaneShape).visible = false
      trigger_02.addComponent(click)
      trigger_02.addComponent(new Transform({
        position: new Vector3(8, 6.25, 8),
        scale: new Vector3(1, 1, 1),
        rotation: Quaternion.Euler(90, 0, 0)
      }))
      let triggerBox02 = new utils.TriggerBoxShape()
      trigger_02.addComponent(
        new utils.TriggerComponent(
          triggerBox02,
        {
          onCameraExit :() => {
            log('triggered!')
            channel_03.getComponent(utils.ToggleComponent).toggle()}
      }))
      click.playing = true

      //tables
      let tables = new Entity()
      let tablesPath:string = "models/tables.glb"
          tables.addComponent(new GLTFShape(tablesPath))
          tables.addComponent(new Transform({
              position: new Vector3(0, 0, 0),
              scale: new Vector3(1, 1, 1),
              rotation: Quaternion.Euler(0, 180, 0)
      }))

      //discord
      let discord = new Entity()
      let discordPath:string = "models/discord.glb"
          discord.addComponent(new GLTFShape(discordPath))
          discord.addComponent(new Transform({
              position: new Vector3(1.75, 1.65, 9.1),
              scale: new Vector3(2, 2, 2),
              rotation: Quaternion.Euler(0, 100, 0)
          }))
          discord.addComponent(
            new OnPointerDown(() => {
              openExternalURL("https://discord.com/")
          }))

      //twitter
      let twitter = new Entity()
      let twitterPath:string = "models/twitter.glb"
          twitter.addComponent(new GLTFShape(twitterPath))
          twitter.addComponent(new Transform({
              position: new Vector3(3.95, 1.65, 12.85),
              scale: new Vector3(2, 2, 2),
              rotation: Quaternion.Euler(0, 150, 0)
          }))
          twitter.addComponent(
            new OnPointerDown(() => {
              openExternalURL("https://twitter.com/")
          }))

      //facebook
      let facebook = new Entity()
      let facebookPath:string = "models/facebook.glb"
          facebook.addComponent(new GLTFShape(facebookPath))
          facebook.addComponent(new Transform({
              position: new Vector3(12.05, 1.65, 12.85),
              scale: new Vector3(2, 2, 2),
              rotation: Quaternion.Euler(0, 215, 0)
          }))
          facebook.addComponent(
            new OnPointerDown(() => {
              openExternalURL("https://www.facebook.com/")
          }))

      //youtube
      let youtube = new Entity()
      let youtubePath:string = "models/youtube.glb"
          youtube.addComponent(new GLTFShape(youtubePath))
          youtube.addComponent(new Transform({
              position: new Vector3(14.25, 1.65, 9.1),
              scale: new Vector3(2, 2, 2),
              rotation: Quaternion.Euler(0, 260, 0)
          }))
          youtube.addComponent(
            new OnPointerDown(() => {
              openExternalURL("https://www.youtube.com/")
          }))

      //instagram
      let instagram = new Entity()
      let instagramPath:string = "models/instagram.glb"
          instagram.addComponent(new GLTFShape(instagramPath))
          instagram.addComponent(new Transform({
              position: new Vector3(10.2, 1.65, 2.05),
              scale: new Vector3(2, 2, 2),
              rotation: Quaternion.Euler(0, -15, 0)
          }))
          instagram.addComponent(
            new OnPointerDown(() => {
              openExternalURL("https://www.instagram.com/")
          }))

      //telegram
      let telegram = new Entity()
      let telegramPath:string = "models/telegram.glb"
          telegram.addComponent(new GLTFShape(telegramPath))
          telegram.addComponent(new Transform({
              position: new Vector3(5.8, 1.65, 2.05),
              scale: new Vector3(2, 2, 2),
              rotation: Quaternion.Euler(0, 0, 0)
          }))
          telegram.addComponent(
            new OnPointerDown(() => {
              openExternalURL("https://telegram.org/")
          }))

//Set parent
trigger_02.setParent(channel_02)
tables.setParent(channel_02)
discord.setParent(channel_02)
twitter.setParent(channel_02)
facebook.setParent(channel_02)
youtube.setParent(channel_02)
instagram.setParent(channel_02)
telegram.setParent(channel_02)

//Channel 03 - Parent
let channel_03 = new Entity()
    channel_03.addComponent(
        new utils.ToggleComponent(utils.ToggleState.On, value => {
            engine.removeEntity(channel_02),
            engine.addEntity(channel_03)
      })
    )

      //Channel Trigger 03
      const trigger_03 = new Entity()
      trigger_03.addComponent(new PlaneShape())
      trigger_03.getComponent(PlaneShape).withCollisions = false
      trigger_03.getComponent(PlaneShape).visible = false
      trigger_03.addComponent(click)
      trigger_03.addComponent(new Transform({
        position: new Vector3(8, 6.25, 8),
        scale: new Vector3(1, 1, 1),
        rotation: Quaternion.Euler(90, 0, 0)
      }))
      let triggerBox03 = new utils.TriggerBoxShape()
      trigger_03.addComponent(
        new utils.TriggerComponent(
          triggerBox03,
        {
          onCameraExit :() => {
            log('triggered!')
            channel_04.getComponent(utils.ToggleComponent).toggle()}
      }))
      click.playing = true

      //NFT 01
      const nft_01 = new Entity()
      const shapeComponent01 = new NFTShape(
        'ethereum://0x06012c8cf97BEaD5deAe237070F9587f8E7A266d/362609',
        { color: Color3.White(), style: PictureFrameStyle.Canvas}
      )
      nft_01.addComponent(shapeComponent01)
      nft_01.addComponent(
        new Transform({
          position: new Vector3(8, 3, 15),
          scale: new Vector3(8, 8, 7),
          rotation: Quaternion.Euler(180, 180, 180)
      }))
      nft_01.addComponent(
        new OnPointerDown((e) => {
          openNFTDialog(
            "ethereum://0x06012c8cf97BEaD5deAe237070F9587f8E7A266d/362609"
          )
        })
      )


//Set parent
trigger_03.setParent(channel_03)
nft_01.setParent(channel_03)

//Channel 04 - Parent
let channel_04 = new Entity()
    channel_04.addComponent(
        new utils.ToggleComponent(utils.ToggleState.On, value => {
            engine.removeEntity(channel_03),
            engine.addEntity(channel_04)
      })
    )

      //Channel Trigger 04
      const trigger_04 = new Entity()
      trigger_04.addComponent(new PlaneShape())
      trigger_04.getComponent(PlaneShape).withCollisions = false
      trigger_04.getComponent(PlaneShape).visible = false
      trigger_04.addComponent(click)
      trigger_04.addComponent(new Transform({
        position: new Vector3(8, 6.25, 8),
        scale: new Vector3(1, 1, 1),
        rotation: Quaternion.Euler(90, 0, 0)
      }))
      let triggerBox04 = new utils.TriggerBoxShape()
      trigger_04.addComponent(
        new utils.TriggerComponent(
          triggerBox04,
        {
          onCameraExit :() => {
            log('triggered!')
            channel_05.getComponent(utils.ToggleComponent).toggle()}
      }))
      click.playing = true

      //folly
      let folly = new Entity()
      let follyPath:string = "models/folly.glb"
          folly.addComponent(new GLTFShape(follyPath))
          folly.addComponent(new Transform({
              position: new Vector3(8, 0, 8),
              scale: new Vector3(1, 1, 1),
              rotation: Quaternion.Euler(0, 0, 0)
          }))

//Set parent
trigger_04.setParent(channel_04)
folly.setParent(channel_04)

//Channel 05 - Parent
let channel_05 = new Entity()
    channel_05.addComponent(
        new utils.ToggleComponent(utils.ToggleState.On, value => {
            engine.removeEntity(channel_04),
            engine.addEntity(channel_05)
      })
    )

      //Channel Trigger 05
      const trigger_05 = new Entity()
      trigger_05.addComponent(new PlaneShape())
      trigger_05.getComponent(PlaneShape).withCollisions = false
      trigger_05.getComponent(PlaneShape).visible = false
      trigger_05.addComponent(click)
      trigger_05.addComponent(new Transform({
        position: new Vector3(8, 6.25, 8),
        scale: new Vector3(1, 1, 1),
        rotation: Quaternion.Euler(90, 0, 0)
      }))
      let triggerBox05 = new utils.TriggerBoxShape()
      trigger_05.addComponent(
        new utils.TriggerComponent(
          triggerBox05,
        {
          onCameraExit :() => {
            log('triggered!')
            channel_01.getComponent(utils.ToggleComponent).toggle()}
      }))
      click.playing = true

      //signature
      let signature = new Entity()
      let signaturePath:string = "models/signature.glb"
          signature.addComponent(new GLTFShape(signaturePath))
          signature.addComponent(new Transform({
              position: new Vector3(0, 0, 0),
              scale: new Vector3(1, 1, 1),
              rotation: Quaternion.Euler(0, 180, 0)
          }))

//Set parent
trigger_05.setParent(channel_05)
signature.setParent(channel_05)

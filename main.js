import { CSS3DObject } from './libs/renderer/CSS3DRenderer.js';
import {loadGLTF, loadAudio,loadVideo} from "./libs/loader/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './assets/targets/Latest_Demo.mind',
    });
    const {renderer, cssRenderer, scene, cssScene, camera} = mindarThree;


    //Load video
    for(var i=0;i<5;i++)
    {

      if(i<=4)
      {
        const video = await loadVideo("./assets/CarVideo/Demo"+i+".mp4");
        const texture = new THREE.VideoTexture(video);

        const geometry = new THREE.PlaneGeometry(1, 204/480);
        const material = new THREE.MeshBasicMaterial({map: texture});
        const plane = new THREE.Mesh(geometry, material);

        const anchor = mindarThree.addAnchor(i);
        anchor.group.add(plane);

        anchor.onTargetFound = () => {
              video.play();
        }
        anchor.onTargetLost = () => {
              video.pause();
        }
        video.addEventListener( 'play', () => {
              video.currentTime = 6;
        });
    }
    if(i>4)
    {
      if(i==5)
      {
      const obj = new CSS3DObject(document.querySelector("#ar-div-gear"));
      const anchor1 = mindarThree.addCSSAnchor(i);
      anchor1.group.add(obj);   
      }  
      if(i==6)
      {
      const obj = new CSS3DObject(document.querySelector("#ar-div-shaft"));
      const anchor1 = mindarThree.addCSSAnchor(i);
      anchor1.group.add(obj);   
      }  
      const anchor = mindarThree.addAnchor(i); 	
      const audioClip = await loadAudio('./assets/sounds/musicband-background.mp3');
      const listener = new THREE.AudioListener();
      camera.add(listener);
  
      const audio = new THREE.PositionalAudio(listener);
      anchor.group.add(audio);
  
      audio.setBuffer(audioClip);
      audio.setVolume(20);
      audio.setRefDistance(100);
      audio.setLoop(false);
  
      anchor.onTargetFound = () => {
        audio.play();
      }
      anchor.onTargetLost = () => {
        audio.pause();
      }


    }

  }



   /* const obj = new CSS3DObject(document.querySelector("#ar-div"));
    const anchor1 = mindarThree.addCSSAnchor(0);
    anchor1.group.add(obj);

	
	const anchor = mindarThree.addAnchor(0); 	
	const audioClip = await loadAudio('./assets/sounds/musicband-background.mp3');
    const listener = new THREE.AudioListener();
    camera.add(listener);

    const audio = new THREE.PositionalAudio(listener);
    anchor.group.add(audio);

    audio.setBuffer(audioClip);
	  audio.setVolume(20);
    audio.setRefDistance(100);
    audio.setLoop(false);

    anchor.onTargetFound = () => {
      audio.play();
    }
    anchor.onTargetLost = () => {
      audio.pause();
    }*/

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
      cssRenderer.render(cssScene, camera);
    });
  }
  start();
});

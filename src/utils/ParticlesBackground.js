import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; // loads tsparticles-slim
// import { loadFull } from "tsparticles"; // loads tsparticles
import { useCallback, useMemo } from "react";


const ParticlesBackground = (props) => {
 
  const options = useMemo(() => {
    
    return {
      fullScreen: {
        enable: true,
        zIndex: -1
      },
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
         
          onHover: {
            enable: false,
            mode: "repulse",
            
          },
          
        },
        modes: {
          trail: {
            delay: 1,
            pauseOnStop: false,
            quantity: 100
          },
          attract: {
            distance: 200,
            duration: 0.4,
            easing: "ease-out-quad",
            factor: 1,
            maxSpeed: 50,
            speed: 1
          },
          bounce: {
            distance: 200
          },
          bubble: {
            distance: 200,
            duration: 0.4,
            mix: false
          },
          connect: {
            distance: 80,
            links: {
              opacity: 0.5
            },
            radius: 60
          },
          grab: {
            distance: 100,
            links: {
              blink: false,
              consent: false,
              opacity: 100
            }
          },
          push: {
            default: true,
            groups: [],
            quantity: 4
          },
          remove: {
            quantity: 2
          },
          repulse: {
            distance: 200,
            duration: 0.4,
            factor: 100,
            speed: 1,
            maxSpeed: 50,
            easing: "ease-out-quad"
          },
          slow: {
            factor: 3,
            radius: 200
          },
          light: {
            area: {
              gradient: {
                start: {
                  value: "#ffffff"
                },
                stop: {
                  value: "#000000"
                }
              },
              radius: 1000
            },
            shadow: {
              color: {
                value: "#000000"
              },
              length: 2000
            }
          }
        }
      },
      manualParticles: [],
      particles: {
        bounce: {
          horizontal: {
            value: 0
          },
          vertical: {
            value: 0
          }
        },
        collisions: {
          absorb: {
            speed: 2
          },
          bounce: {
            horizontal: {
              value: 1
            },
            vertical: {
              value: 1
            }
          },
          enable: false,
          maxSpeed: 50,
          mode: "bounce",
          overlap: {
            enable: true,
            retries: 0
          }
        },
        color: {
          value: [
            "#1E00FF",
            "#FF0061",
            "#E1FF00",
            "#00FF9E"
          ],
          animation: {
            h: {
              count: 0,
              enable: true,
              speed: 30,
              decay: 0,
              delay: 0,
              sync: true,
              offset: 0
            },
            s: {
              count: 0,
              enable: false,
              speed: 1,
              decay: 0,
              delay: 0,
              sync: true,
              offset: 0
            },
            l: {
              count: 0,
              enable: false,
              speed: 1,
              decay: 0,
              delay: 0,
              sync: true,
              offset: 0
            }
          }
        },
        effect: {
          close: true,
          fill: true,
          options: {},
          type: []
        },
        groups: {},
        move: {
          angle: {
            offset: 0,
            value: 90
          },
          attract: {
            distance: 200,
            enable: false,
            rotate: {
              x: 3000,
              y: 3000
            }
          },
          center: {
            x: 50,
            y: 50,
            mode: "percent",
            radius: 0
          },
          decay: {
            min: 0.05,
            max: 0.15
          },
          distance: {},
          direction: "top",
          drift: 0,
          enable: true,
          gravity: {
            acceleration: 9.81,
            enable: true,
            inverse: false,
            maxSpeed: 200
          },
          path: {
            clamp: true,
            delay: {
              value: 0
            },
            enable: false,
            options: {}
          },
          outModes: {
            default: "destroy",
            bottom: "destroy",
            left: "destroy",
            right: "destroy",
            top: "none"
          },
          random: false,
          size: false,
          speed: {
            min: 50,
            max: 150
          },
          spin: {
            acceleration: 0,
            enable: false
          },
          straight: false,
          trail: {
            enable: false,
            length: 10,
            fill: {}
          },
          vibrate: false,
          warp: false
        },
        number: {
          density: {
            enable: false,
            width: 1920,
            height: 1080
          },
          limit: {
            mode: "delete",
            value: 300
          },
          value: 0
        },
        opacity: {
          value: 1,
          animation: {
            count: 0,
            enable: false,
            speed: 0.3,
            decay: 0,
            delay: 0,
            sync: true,
            mode: "auto",
            startValue: "max",
            destroy: "min"
          }
        },
        reduceDuplicates: false,
        shadow: {
          blur: 0,
          color: {
            value: "#000"
          },
          enable: false,
          offset: {
            x: 0,
            y: 0
          }
        },
        shape: {
          close: true,
          fill: true,
          options: {
            polygon: [
              {
                sides: 5
              },
              {
                sides: 6
              }
            ]
          },
          type: [
            "circle",
            "square",
            "polygon"
          ]
        },
        size: {
          value: 3,
          animation: {
            count: 0,
            enable: false,
            speed: 5,
            decay: 0,
            delay: 0,
            sync: false,
            mode: "auto",
            startValue: "random",
            destroy: "none"
          }
        },
        stroke: {
          width: 0
        },
        zIndex: {
          value: 0,
          opacityRate: 1,
          sizeRate: 1,
          velocityRate: 1
        },
        destroy: {
          bounds: {},
          mode: "none",
          split: {
            count: 1,
            factor: {
              value: 3
            },
            rate: {
              value: {
                min: 4,
                max: 9
              }
            },
            sizeOffset: true,
            particles: {}
          }
        },
        roll: {
          darken: {
            enable: true,
            value: 30
          },
          enable: true,
          enlighten: {
            enable: true,
            value: 30
          },
          mode: "both",
          speed: {
            min: 15,
            max: 25
          }
        },
        tilt: {
          value: {
            min: 0,
            max: 360
          },
          animation: {
            enable: true,
            speed: 60,
            decay: 0,
            sync: false
          },
          direction: "random",
          enable: true
        },
        twinkle: {
          lines: {
            enable: false,
            frequency: 0.05,
            opacity: 1
          },
          particles: {
            enable: false,
            frequency: 0.05,
            opacity: 1
          }
        },
        wobble: {
          distance: 30,
          enable: true,
          speed: {
            angle: {
              min: -15,
              max: 15
            },
            move: 10
          }
        },
        life: {
          count: 0,
          delay: {
            value: 0,
            sync: false
          },
          duration: {
            value: 0,
            sync: false
          }
        },
        rotate: {
          value: {
            min: 0,
            max: 360
          },
          animation: {
            enable: true,
            speed: 60,
            decay: 0,
            sync: false
          },
          direction: "random",
          path: false
        },
        orbit: {
          animation: {
            count: 0,
            enable: false,
            speed: 1,
            decay: 0,
            delay: 0,
            sync: false
          },
          enable: false,
          opacity: 1,
          rotation: {
            value: 45
          },
          width: 1
        },
        links: {
          blink: false,
          color: {
            value: "#fff"
          },
          consent: false,
          distance: 100,
          enable: false,
          frequency: 1,
          opacity: 1,
          shadow: {
            blur: 5,
            color: {
              value: "#000"
            },
            enable: false
          },
          triangles: {
            enable: false,
            frequency: 1
          },
          width: 1,
          warp: false
        },
        repulse: {
          value: 0,
          enabled: false,
          distance: 1,
          duration: 1,
          factor: 1,
          speed: 1
        }
      },
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
      responsive: [],
      smooth: false,
      style: {},
      themes: [],
      zLayers: 100,
      name: "Wobble",
      emitters: {
        autoPlay: true,
        fill: true,
        life: {
          wait: false
        },
        rate: {
          quantity: 10,
          delay: 0.05
        },
        shape: {
          options: {},
          replace: {
            color: false,
            opacity: false
          },
          type: "square"
        },
        startCount: 0,
        size: {
          mode: "percent",
          height: 0,
          width: 0
        },
        particles: {},
        position: {
          x: 50,
          y: 100
        }
      },
      motion: {
        disable: false,
        reduce: {
          factor: 4,
          value: true
        }
      }
    }
    
     
  
  
  }, []);

 
  const particlesInit = useCallback((engine) => {
    loadSlim(engine);
    // loadFull(engine); 
  }, []);

  
  return <Particles id={props.id} init={particlesInit} options={options} />;
};

export default ParticlesBackground;
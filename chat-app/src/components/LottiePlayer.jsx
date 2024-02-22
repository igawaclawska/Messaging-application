import { Player } from "@lottiefiles/react-lottie-player";

const LottiePlayer = ({ src, height, width, speed, className }) => {
  return (
    <Player
      src={src ? src : "spinner.json"}
      className={"player" + className && className }
      loop
      autoplay
      style={{
        height: height ? height : "19px",
        width: width ? width : "19px",
      }}
      speed={speed ? speed : 1.6}
    />
  );
};

export default LottiePlayer;

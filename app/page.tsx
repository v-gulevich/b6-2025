import RansomText from "@/components/RansomText";
import ProceduralCorkboard from "@/components/ProceduralCorkboard";
import PostItNote from "@/components/PostItNote";

export default function Home() {
  return (
    <main>
      <ProceduralCorkboard>
        <PostItNote
          color="blue"
          rotation={5}
          style={{ top: "10%" }}
        >Сид и мес
          {/* <RansomText fontSize={12}>Сид и мес</RansomText> */}
        </PostItNote>
        <PostItNote
          color="blue"
          rotation={5}
          style={{ top: "10%", right: "1%" }}
        >Сид и мес
          {/* <RansomText fontSize={12}>Сид и мес</RansomText> */}
        </PostItNote>
        <PostItNote
          color="blue"
          rotation={5}
          style={{ top: "60px", left: "170px" }}
        >Сид и мес
          {/* <RansomText fontSize={12}>Сид и мес</RansomText> */}
        </PostItNote>
        <PostItNote
          color="blue"
          rotation={5}
          style={{ top: "190px", left: "45px" }}
        >Сид и мес
          {/* <RansomText fontSize={12}>Сид и мес</RansomText> */}
        </PostItNote>
        <PostItNote
          color="blue"
          rotation={5}
          style={{ top: "220px", left: "255px" }}
        >Сид и месr
          {/* <RansomText fontSize={12}>Сид и мес</RansomText> */}
        </PostItNote>
        <PostItNote
          color="pink"
          rotation={5}
          style={{ top: "210px", right: "255px" }}
        >Сид и месr
          {/* <RansomText fontSize={12}>Сид и мес</RansomText> */}
        </PostItNote>
        <PostItNote
          color="pink"
          rotation={5}
          style={{ top: "210px", right: "50px" }}
        >Сид и месr
          {/* <RansomText fontSize={12}>Сид и мес</RansomText> */}
        </PostItNote>
        <PostItNote
          color="yellow"
          rotation={5}
          style={{ top: "70px", right: "160px" }}
        >Сид и месr
          {/* <RansomText fontSize={12}>Сид и мес</RansomText> */}
        </PostItNote>
      </ProceduralCorkboard>
    </main>
  );
}

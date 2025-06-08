import RansomText from '@/components/RansomText';
import ProceduralCorkboard from "@/components/ProceduralCorkboard";
import PostItNote from '@/components/PostItNote';

export default function Home() {
  return (
    <main>
      <ProceduralCorkboard>
        <PostItNote
  color="blue"
  rotation={5}
  style={{ top: '25%', left: '15%' }}
>
  <RansomText fontSize={18}>Где деньги, Лебовски? </RansomText>
</PostItNote>
        
      </ProceduralCorkboard>
    </main>
  );
}

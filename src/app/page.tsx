import Socials from "@/components/socials";
import { H1, H2, H3, H4, Muted, P } from "@/components/ui/typography";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <div>
      <H2 className="animate-slide-enter">{siteConfig.name}</H2>

      <P className="animate-slide-enter delay-200">
        Porro accusantium ipsam possimus odio ut maxime. Est aspernatur hic
        perferendis pariatur. Iusto quos et quas itaque ea. Et doloremque animi
        earum ad aliquam unde et molestias nihil. Sunt aperiam et expedita cum
        sequi. Dolorum atque doloremque atque qui velit odio consequuntur quia.
        Omnis expedita consequatur aut doloremque itaque iure molestiae esse
        voluptate. Et molestiae minima. Deserunt dolore et omnis voluptas
        fugiat. Fugit autem esse provident dolorem. Eos incidunt iste qui rerum.
        Veniam necessitatibus cumque et sint est. Sit facere enim aperiam aut
        consectetur qui. Debitis error magni ea ab animi dolorum ratione
        inventore.
      </P>

      <div className="flex justify-start items-center gap-x-4 py-8 animate-slide-enter delay-400">
        <Muted>
          <span className="font-semibold">Psst.</span> You can reach me on
        </Muted>
        <Socials />
      </div>
    </div>
  );
}

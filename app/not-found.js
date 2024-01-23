import { SSection } from "./_components/SSection"
import ServerLayerNavbar from "./_ui/serverLayerNavbar";

export default function NotFound() {
    return (
        <div className="p-10 py-16">
            <ServerLayerNavbar/>
            <SSection>
                <h2 className="text-center">
                    Page Not Found
                </h2>
            </SSection>

        </div>
    );
}

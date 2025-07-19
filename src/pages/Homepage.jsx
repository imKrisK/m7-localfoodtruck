
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServiceSection from '../components/ServiceSection';
import FindUsSection from '../components/FindUsSection';
import SpecialsSection from '../components/SpecialsSection';
import ContactSection from '../components/ContactSection';
import Menu from '../components/Menu';

export default function Homepage() {
  return (
    <div className="Homepage">
      <HeroSection />
      <AboutSection />
      <ServiceSection />
      <FindUsSection />
      <SpecialsSection />
      <Menu />
      <ContactSection />
    </div>
  );
}
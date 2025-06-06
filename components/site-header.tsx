"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Início", href: "/" },
  { name: "Serviços", href: "/#servicos" },
  { name: "Sobre", href: "/#sobre" },
  { name: "Depoimentos", href: "/#depoimentos" },
  { name: "Trabalhos", href: "/#trabalhos" },
  { name: "FAQ", href: "/#faq" },
  {
    name: "Contato",
    href: "https://api.whatsapp.com/send?phone=5511934167007&text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20marcar%20uma%20consulta%20com%20o%20Dr.%20Marcos%20!",
  },
];

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("/");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const handleScrollForActiveSection = () => {
      const sections = navigation.map((item) =>
        item.href.replace("/", "").replace("#", "")
      );

      for (const section of sections) {
        if (!section) continue; // Skip home
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(`/#${section}`);
            return;
          }
        }
      }

      if (window.scrollY < 100) {
        setActiveSection("/");
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScrollForActiveSection);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScrollForActiveSection);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      )}
    >
      <nav className="container flex items-center justify-between px-4 md:px-6">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Dr. Marcos Storion</span>
            <div className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="MS Logo"
                width={50}
                height={50}
                className="h-10 w-auto"
              />
              <div
                className={cn(
                  "hidden md:block font-semibold transition-colors",
                  scrolled ? "text-[#2c3e50]" : "text-white"
                )}
              >
                <span className="text-lg">Dr. Marcos Storion</span>
                <p className="text-xs font-normal">Cirurgião Plástico</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <motion.button
            type="button"
            className={cn(
              "-m-2.5 inline-flex items-center justify-center rounded-md p-2.5",
              scrolled ? "text-gray-700" : "text-white"
            )}
            onClick={() => setMobileMenuOpen(true)}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            <span className="sr-only">Abrir menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </motion.button>
        </div>

        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              target={item.name === "Contato" ? "_blank" : undefined}
              rel={item.name === "Contato" ? "noopener noreferrer" : undefined}
              className={cn(
                "text-sm font-semibold leading-6 transition-colors",
                activeSection === item.href
                  ? "text-[#d4af37]"
                  : scrolled
                  ? "text-gray-700 hover:text-[#d4af37]"
                  : "text-white hover:text-[#d4af37]"
              )}
              onClick={(e) => {
                if (item.href.includes("#")) {
                  e.preventDefault();
                  const element = document.getElementById(
                    item.href.split("#")[1]
                  );
                  if (element) {
                    const yOffset = -80;
                    const y =
                      element.getBoundingClientRect().top +
                      window.pageYOffset +
                      yOffset;
                    window.scrollTo({ top: y, behavior: "smooth" });
                    setActiveSection(item.href);
                  }
                }
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button
            className="bg-[#d4af37] hover:bg-[#b8971f] text-white"
            onClick={() =>
              window.open(
                "https://api.whatsapp.com/send?phone=5511934167007&text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20marcar%20uma%20consulta%20com%20o%20Dr.%20Marcos%20!",
                "_blank"
              )
            }
          >
            <Phone className="mr-2 h-4 w-4" />
            Agende sua consulta
          </Button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.div
                className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <div className="flex items-center justify-between">
                  <Link href="/" className="-m-1.5 p-1.5">
                    <span className="sr-only">Dr. Marcos Storion</span>
                    <div className="flex items-center gap-2">
                      <Image
                        src="/images/logo.png"
                        alt="MS Logo"
                        width={40}
                        height={40}
                        className="h-8 w-auto"
                      />
                      <div className="text-[#2c3e50] font-semibold">
                        <span className="text-base">Dr. Marcos Storion</span>
                        <p className="text-xs font-normal">
                          Cirurgião Plástico
                        </p>
                      </div>
                    </div>
                  </Link>
                  <motion.button
                    type="button"
                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="sr-only">Fechar menu</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </motion.button>
                </div>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-200">
                    <div className="space-y-2 py-6">
                      {navigation.map((item, index) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            href={item.href}
                            className={cn(
                              "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7",
                              activeSection === item.href
                                ? "bg-gray-50 text-[#d4af37]"
                                : "text-gray-900 hover:bg-gray-50"
                            )}
                            onClick={(e) => {
                              if (item.href.includes("#")) {
                                e.preventDefault();
                                setMobileMenuOpen(false);
                                const element = document.getElementById(
                                  item.href.split("#")[1]
                                );
                                if (element) {
                                  setTimeout(() => {
                                    const yOffset = -80;
                                    const y =
                                      element.getBoundingClientRect().top +
                                      window.pageYOffset +
                                      yOffset;
                                    window.scrollTo({
                                      top: y,
                                      behavior: "smooth",
                                    });
                                    setActiveSection(item.href);
                                  }, 100);
                                }
                              } else {
                                setMobileMenuOpen(false);
                              }
                            }}
                          >
                            {item.name}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                    <div className="py-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: navigation.length * 0.05 + 0.1 }}
                      >
                        <Button
                          className="w-full bg-[#d4af37] hover:bg-[#b8971f] text-white"
                          onClick={() => {
                            window.open(
                              "https://wa.me/5511934167007",
                              "_blank"
                            );
                            setMobileMenuOpen(false);
                          }}
                        >
                          <Phone className="mr-2 h-4 w-4" />
                          <p>Agende sua consulta</p>
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

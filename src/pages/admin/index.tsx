import SimpleLayout from "@/layouts/simpleLayout";
import Head from "next/head";
import React from "react";
import { Frijole } from "next/font/google";
import Breadcrumbs from "@/components/Breadcrumbs";
import { AiOutlineHome } from "react-icons/ai";
import { Tab } from "@headlessui/react";

const frijole = Frijole({
  subsets: ["latin"],
  weight: "400",
});

function AdminPage() {
  const tabs = ["Catalog", "Categories", "Models", "Sales", "Reports"];

  return (
    <SimpleLayout>
      <Head>
        <title>Admin</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="min-h-[50%] w-[90vw] px-4 sm:px-6 lg:px-8">
        <h1
          className={`${frijole.className} text-5xl py-4 md:py-6 text-orange-2`}
          style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 1)" }}
        >
          Administration
        </h1>
        <Breadcrumbs
          homeElement={<AiOutlineHome />}
          separator={<span> / </span>}
          activeClasses="text-amber-500"
          containerClasses="flex py-2 md:py-4 bg-gradient-to-r from-purple-600 to-blue-600 items-center"
          listClasses="hover:underline mx-2 font-bold"
          capitalizeLinks
        />
        <div className="flex gap-8">
          <Tab.Group>
            <Tab.List className="flex flex-col bg-purple-3 bg-opacity-50 md:text-lg p-4 gap-1 md:gap-2 justify-center mb-2 shadow-md rounded">
              {tabs.map((e, idx) => (
                <Tab
                  key={idx}
                  className={({
                    selected,
                  }) => `w-full rounded-lg py-2.5 px-4 leading-5 text-orange-2 ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-1 text-start 
                    ${
                      selected
                        ? "bg-white shadow"
                        : "text-purple-1 hover:bg-white/[0.12] hover:text-white"
                    }`}
                >
                  {e}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                {/* Crear componente individual - CATALOG */}
                <p>Crear componente individual - CATALOG</p>
              </Tab.Panel>
              <Tab.Panel>
                {/* Crear componente individual - CATEGORIES */}
                <p>Crear componente individual - CATEGORIES</p>
              </Tab.Panel>
              <Tab.Panel>
                {/* Crear componente individual - MODELS */}
                <p>Crear componente individual - MODELS</p>
              </Tab.Panel>
              <Tab.Panel>
                {/* Crear componente individual - SALES */}
                <p>Crear componente individual - SALES</p>
              </Tab.Panel>
              <Tab.Panel>
                {/* Crear componente individual - REPORTS */}
                <p>Crear componente individual - REPORTS</p>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </section>
    </SimpleLayout>
  );
}

export default AdminPage;

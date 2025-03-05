const fs = require("fs/promises");
const path = require("path");

// Rutas base
const dataDir = path.join(__dirname, "resources/js/data");
const pagesDir = path.join(__dirname, "resources/js/pages");

// Plantilla para create.tsx
const createTemplate = ({ modelName, name }) => `
import { FormBuilder } from "@/components/form";
import { PageProps } from "@/types";
import { FormBuilder as FormType } from "@/types/form";
import ${modelName}Form from "@/data/${modelName}.json";

export default function Create({ auth }: PageProps) {
    const form: FormType = ${modelName}Form as FormType;
    return <FormBuilder form={form} user={auth.user} action="New" />;
}
`;

// Plantilla para edit.tsx
const editTemplate = ({ modelName, name }) => `
import { FormBuilder } from "@/components/form";
import { PageProps } from "@/types";
import { FormBuilder as FormType } from "@/types/form";
import ${modelName}Form from "@/data/${modelName}.json";

interface EditPageProps extends PageProps {
    ${name}?: any;
}

export default function Edit({ auth, ${name} }: EditPageProps) {
    const form: FormType = ${modelName}Form as FormType;
    return <FormBuilder form={form} user={auth.user} action="Edit"  />;
}
`;

// Plantilla para index.tsx
const indexTemplate = ({ modelName, name }) => `
import { ListBuilder } from "@/components/list";
import { PageProps } from "@/types";
import { FormBuilder as FormType } from "@/types/form";
import ${modelName}Form from "@/data/${modelName}.json";

export default function Index({ auth, data }: PageProps) {
    const form: FormType = ${modelName}Form as FormType;
    return <ListBuilder form={form} auth={auth} data={data} />;
}
`;

// Función principal para generar las páginas
async function generatePages() {
    try {
        // Verificar y crear los directorios si no existen
        await fs.mkdir(dataDir, { recursive: true });
        await fs.mkdir(pagesDir, { recursive: true });

        // Leer todos los archivos en la carpeta data
        const files = await fs.readdir(dataDir);
        const jsonFiles = files.filter((file) => file.endsWith(".json"));

        if (jsonFiles.length === 0) {
            console.log("No se encontraron archivos JSON en la carpeta data.");
            return;
        }

        for (const file of jsonFiles) {
            const modelName = path.basename(file, ".json"); // Nombre sin extensión
            const dataPath = path.join(dataDir, file);
            const modelFolder = path.join(pagesDir, modelName);

            // Leer el contenido del JSON para validar y extraer 'name'
            const dataContent = await fs.readFile(dataPath, "utf8");
            const modelData = JSON.parse(dataContent);
            const { name } = modelData;

            // Crear la carpeta si no existe
            await fs.mkdir(modelFolder, { recursive: true });

            // Generar create.tsx
            const createContent = createTemplate({ modelName, name });
            await fs.writeFile(
                path.join(modelFolder, "create.tsx"),
                createContent,
                "utf8"
            );

            // Generar edit.tsx
            const editContent = editTemplate({ modelName, name });
            await fs.writeFile(
                path.join(modelFolder, "edit.tsx"),
                editContent,
                "utf8"
            );

            // Generar index.tsx
            const indexContent = indexTemplate({ modelName, name });
            await fs.writeFile(
                path.join(modelFolder, "index.tsx"),
                indexContent,
                "utf8"
            );

            console.log(`Generados index.tsx, create.tsx y edit.tsx para ${modelName}`);
        }

        console.log("¡Generación completada!");
    } catch (error) {
        console.error("Error al generar las páginas:", error);
    }
}

// Ejecutar el script
generatePages().catch((err) => console.error("Error en la ejecución:", err));

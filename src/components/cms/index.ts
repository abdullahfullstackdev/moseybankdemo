// Auto generated dictionary
// @not-modified => When this line is removed, the "force" parameter of the CLI tool is required to overwrite this file
import { type ComponentTypeDictionary } from "@remkoj/optimizely-cms-react";
import NodeComponent from "./node";
import VideoFactory from "./video";
import SectionFactory from "./section";
import PageFactory from "./page";
import NodesFactory from "./nodes";
import MediaFactory from "./media";
import ImageFactory from "./image";
import ExperienceFactory from "./experience";
import ComponentFactory from "./component";

// Prefix entries - if needed
prefixDictionaryEntries(VideoFactory, "Media");
prefixDictionaryEntries(VideoFactory, "Video");
prefixDictionaryEntries(VideoFactory, "Component");
prefixDictionaryEntries(SectionFactory, "Section");
prefixDictionaryEntries(PageFactory, "Page");
prefixDictionaryEntries(NodesFactory, "Nodes");
prefixDictionaryEntries(MediaFactory, "Media");
prefixDictionaryEntries(MediaFactory, "Component");
prefixDictionaryEntries(ImageFactory, "Media");
prefixDictionaryEntries(ImageFactory, "Image");
prefixDictionaryEntries(ImageFactory, "Component");
prefixDictionaryEntries(ExperienceFactory, "Experience");
prefixDictionaryEntries(ExperienceFactory, "Page");
prefixDictionaryEntries(ComponentFactory, "Component");

// Build dictionary
export const CmsFactory : ComponentTypeDictionary = [
    { 
        type: "Node", 
        component: NodeComponent 
    },
    ...VideoFactory,
    ...SectionFactory,
    ...PageFactory,
    ...NodesFactory,
    ...MediaFactory,
    ...ImageFactory,
    ...ExperienceFactory,
    ...ComponentFactory
];

// Export dictionary
export default CmsFactory;

// Helper functions
function prefixDictionaryEntries(list: ComponentTypeDictionary, prefix: string) : ComponentTypeDictionary
{
    list.forEach((component, idx, dictionary) => {
        dictionary[idx].type = typeof component.type == 'string' ? prefix + "/" + component.type : [ prefix, ...component.type ]
    });
    return list;
}

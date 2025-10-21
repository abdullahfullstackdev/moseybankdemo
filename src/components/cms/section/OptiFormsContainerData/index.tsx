import { CmsEditable, type CmsComponent } from "@remkoj/optimizely-cms-react/rsc";
import { OptiFormsContainerDataDataFragmentDoc, type OptiFormsContainerDataDataFragment } from "@/gql/graphql";
import { SectionLayoutProps } from "../styles/displayTemplates";

/**
 * Form Container
 * A structured block to manage form elements on a page.
 */
export const OptiFormsContainerDataSection : CmsComponent<OptiFormsContainerDataDataFragment, SectionLayoutProps> = ({ data, layoutProps, editProps }) => {
    const componentName = 'Form Container'
    const componentInfo = 'A structured block to manage form elements on a page.'
    return <CmsEditable className="w-full border-y border-y-solid border-y-slate-900 py-2 mb-4" {...editProps}>
        <div className="font-bold italic">{ componentName }</div>
        <div>{ componentInfo }</div>
        { Object.getOwnPropertyNames(data).length > 0 && <pre className="w-full overflow-x-hidden font-mono text-sm bg-slate-200 p-2 rounded-sm border border-solid border-slate-900 text-slate-900">{ JSON.stringify(data, undefined, 4) }</pre> }
    </CmsEditable>
}
OptiFormsContainerDataSection.displayName = "Form Container (Section/OptiFormsContainerData)"
OptiFormsContainerDataSection.getDataFragment = () => ['OptiFormsContainerDataData', OptiFormsContainerDataDataFragmentDoc]

export default OptiFormsContainerDataSection
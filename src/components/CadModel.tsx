import type { CadModelKind } from '../data/cadExamples'

interface CadModelProps {
  kind: CadModelKind
}

function BracketModel() {
  return (
    <g>
      <path className="cad-face" d="M148 158 324 92l144 65-176 66Z" />
      <path className="cad-face" d="m148 158 144 65v135l-144-65Z" />
      <path className="cad-face" d="m292 223 176-66v135l-176 66Z" />
      <path className="cad-line" d="m183 174 107 48v100" />
      <path className="cad-line" d="m430 173-138 51" />
      <ellipse className="cad-hole" cx="232" cy="157" rx="15" ry="8" />
      <ellipse className="cad-hole" cx="385" cy="150" rx="15" ry="8" />
      <ellipse className="cad-hole" cx="232" cy="296" rx="15" ry="8" transform="rotate(24 232 296)" />
      <path className="cad-dimension" d="M125 145 305 78m-169 53-11 14m191-81-11 14" />
      <path className="cad-dimension" d="M486 151v143m-9-136 9-7 9 7m-18 129 9 7 9-7" />
    </g>
  )
}

function EnclosureModel() {
  return (
    <g>
      <path className="cad-face" d="m133 161 201-75 162 79-205 78Z" />
      <path className="cad-face" d="m133 161 158 82v133l-158-83Z" />
      <path className="cad-face" d="m291 243 205-78v132l-205 79Z" />
      <path className="cad-line cad-dashed" d="m156 160 180-66 137 67-183 69Z" />
      <path className="cad-line" d="m158 185 133 69 181-69" />
      <path className="cad-hole" d="m332 273 112-42v12l-112 43Zm0 27 112-43v12l-112 43Zm0 27 112-43v12l-112 43Z" />
      <ellipse className="cad-hole" cx="207" cy="226" rx="10" ry="6" transform="rotate(26 207 226)" />
      <ellipse className="cad-hole" cx="248" cy="248" rx="10" ry="6" transform="rotate(26 248 248)" />
      <path className="cad-dimension" d="M108 147 324 67m-204 65-12 15m228-95-12 15" />
      <path className="cad-dimension" d="M514 159v142m-8-134 8-8 8 8m-16 126 8 8 8-8" />
    </g>
  )
}

function JigModel() {
  return (
    <g>
      <path className="cad-face" d="m87 205 281-103 178 90-285 107Z" />
      <path className="cad-face" d="m87 205 174 94v64L87 269Z" />
      <path className="cad-face" d="m261 299 285-107v62L261 363Z" />
      <path className="cad-hole" d="m174 201 70-26 49 25-70 27Z" />
      <path className="cad-hole" d="m353 181 70-26 49 25-70 27Z" />
      <path className="cad-line" d="M207 177v-55m0 55c0 10 21 10 21 0v-55m-21 0c0-10 21-10 21 0" />
      <path className="cad-line" d="M388 154V99m0 55c0 10 21 10 21 0V99m-21 0c0-10 21-10 21 0" />
      <path className="cad-line cad-dashed" d="m273 252 111-42" />
      <path className="cad-dimension" d="M67 192 356 85M79 176l-12 16m301-123-12 16" />
      <path className="cad-dimension" d="m213 107 181-67m-170 51-11 16m192-83-11 16" />
    </g>
  )
}

export function CadModel({ kind }: CadModelProps) {
  return (
    <svg aria-hidden="true" className="cad-model" viewBox="0 0 640 440">
      {kind === 'bracket' ? <BracketModel /> : null}
      {kind === 'enclosure' ? <EnclosureModel /> : null}
      {kind === 'jig' ? <JigModel /> : null}
    </svg>
  )
}

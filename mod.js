// src/sign.deno.wat.js
import { wrap } from "https://raw.githubusercontent.com/mitschabaude/watever/main/watever-js-wrapper/wrap.js";

// src/crypto.js
function randomBytes(n) {
  return crypto.getRandomValues(new Uint8Array(n));
}
async function hashNative(msg) {
  return new Uint8Array(await crypto.subtle.digest("SHA-512", msg));
}

// src/sign.deno.wat.js
import { addLock, removeLock } from "https://raw.githubusercontent.com/mitschabaude/watever/main/watever-js-wrapper/wrap.js";
var wasm = "AGFzbQEAAAABYg5gAX8AYAF/AX9gAX4AYAR+fn5+AGAQfn5+fn5+fn5+fn5+fn5+fgBgAn9/AX9gA39/fwF/YAR/f39/AX9gBX9/f39/AX9gBn9/f39/fwF/YAAAYAJ/fwBgA39/fwBgAAF/AvwDDwJqcxtzID0+IHt0aHJvdyBFcnJvcihzKTt9I2xpZnQAAAcjY3J5cHRvD2hhc2hOYXRpdmUjbGlmdAABByNjcnlwdG8LcmFuZG9tQnl0ZXMAAQJqcwtjb25zb2xlLmxvZwAAAmpzC2NvbnNvbGUubG9nAAACanMLY29uc29sZS5sb2cAAgJqcwtjb25zb2xlLmxvZwADAmpzC2NvbnNvbGUubG9nAAQCanMyKHAsIGMsIC4uLmFyZ3MpID0+IHAudGhlbih4ID0+IGMoeCwgLi4uYXJncykpI2xpZnQABQJqczIocCwgYywgLi4uYXJncykgPT4gcC50aGVuKHggPT4gYyh4LCAuLi5hcmdzKSkjbGlmdAAGAmpzMihwLCBjLCAuLi5hcmdzKSA9PiBwLnRoZW4oeCA9PiBjKHgsIC4uLmFyZ3MpKSNsaWZ0AAcCanMyKHAsIGMsIC4uLmFyZ3MpID0+IHAudGhlbih4ID0+IGMoeCwgLi4uYXJncykpI2xpZnQACAJqczIocCwgYywgLi4uYXJncykgPT4gcC50aGVuKHggPT4gYyh4LCAuLi5hcmdzKSkjbGlmdAAJEndhdGV2ZXItanMtd3JhcHBlcgdhZGRMb2NrAAESd2F0ZXZlci1qcy13cmFwcGVyCnJlbW92ZUxvY2sAAQM6OQoKAQEAAAEBAQUBAQEBAQABAAYHCAELDAwMDAsADAwLBQcLAQsLCwwLDAsFCwsFBgcHBgcNAQEFAQQEAXAABQUDAQABBnoWfwBB0QcLfwFBAAt/AUEAC38AQQALfwBBAgt/AEEDC38AQQQLfwBBBQt/AEEGC38AQQcLfwBBCAt/AEEAC38AQYABC38AQYACC38AQYADC38AQYAEC38AQYAFC38AQYQHC38AQZQHC38AQaoHC38AQbsHC38AQcgHCweBAQkJc2lnbiNsaWZ0AD0LdmVyaWZ5I2xpZnQAQQ9uZXdLZXlQYWlyI2xpZnQAQxlrZXlQYWlyRnJvbVNlY3JldEtleSNsaWZ0AEQUa2V5UGFpckZyb21TZWVkI2xpZnQARQV0YWJsZQEABm1lbW9yeQIABWFsbG9jABEFcmVzZXQAEAgBDwkLAQBBAAsFQkY+P0AK8zk5CgAjACQBIwEkAgsGACMBJAILMwECfyMCQQRqIQEjAiAANgIAIAEgAGokAiMCQQRqQRB2QQFqIgI/AEsEQCACQAAaCyABCwoAIABBBGsoAgALHwECfyAAIAAQEmohASABEA0hAiMBIAJJBEAgAiQBCwsrAQJ/IAAgABASaiEBIAEQDiECQX8gAkYEQCMAJAELIwEgAksEQCACJAELCwoAIwMQHyAAECALCwAjBBAfIAAQHxoLEAAjBRAfIAAQICAAEBIQIAsOACMFEB8gABAgIAEQIAsQACMGEB8gABAgIAAQEhAgCwoAIwkQHyAAECALCgAjChAfIAAQIAsLACMHEB8gABAfGgsLACMIEB8gABAfGgsMAEECEBwaIAAQGRoLFgEBf0EBEBEhASABIAA6AAAgAUEEawsLAEEEEBEgADYCAAsOACAAEBogARAbIAIQCQsQACAAEBogARAbIAIgAxAKCxIAIAAQGiABEBsgAiADIAQQCwsSAQF/IAAQESEBIAEgABAlIAELJQECfyAAIAFqIQMgACECA0AgAkEAOgAAIAMgAkEBaiICRw0ACwsnAQF/QQAhAwNAIAMgAGogAyABaiwAADoAACACIANBAWoiA0cNAAsLKgEBf0EAIQMDQCAAIANBA3RqIAMgAWoxAAA3AwAgAiADQQFqIgNHDQALC4ICACAAIAEpAwAgAikDAHw3AwAgACABKQMIIAIpAwh8NwMIIAAgASkDECACKQMQfDcDECAAIAEpAxggAikDGHw3AxggACABKQMgIAIpAyB8NwMgIAAgASkDKCACKQMofDcDKCAAIAEpAzAgAikDMHw3AzAgACABKQM4IAIpAzh8NwM4IAAgASkDQCACKQNAfDcDQCAAIAEpA0ggAikDSHw3A0ggACABKQNQIAIpA1B8NwNQIAAgASkDWCACKQNYfDcDWCAAIAEpA2AgAikDYHw3A2AgACABKQNoIAIpA2h8NwNoIAAgASkDcCACKQNwfDcDcCAAIAEpA3ggAikDeHw3A3gLggIAIAAgASkDACACKQMAfTcDACAAIAEpAwggAikDCH03AwggACABKQMQIAIpAxB9NwMQIAAgASkDGCACKQMYfTcDGCAAIAEpAyAgAikDIH03AyAgACABKQMoIAIpAyh9NwMoIAAgASkDMCACKQMwfTcDMCAAIAEpAzggAikDOH03AzggACABKQNAIAIpA0B9NwNAIAAgASkDSCACKQNIfTcDSCAAIAEpA1AgAikDUH03A1AgACABKQNYIAIpA1h9NwNYIAAgASkDYCACKQNgfTcDYCAAIAEpA2ggAikDaH03A2ggACABKQNwIAIpA3B9NwNwIAAgASkDeCACKQN4fTcDeAsKACAAIAEgARAsC2ICAn4Bf0IBIQFBACEDA0AgACADaikDACABfEL//wN8IQIgAkIQhyEBIAAgA2ogAiABQoCABH59NwMAQYABIANBCGoiA0cNAAsgACAAKQMAIAFCAX1CJSABQgF9fnx8NwMAC98VATJ+IAEpAwAhAyABKQMIIQQgASkDECEFIAEpAxghBiABKQMgIQcgASkDKCEIIAEpAzAhCSABKQM4IQogASkDQCELIAEpA0ghDCABKQNQIQ0gASkDWCEOIAEpA2AhDyABKQNoIRAgASkDcCERIAEpA3ghEiACKQMAIRMgAikDCCEUIAIpAxAhFSACKQMYIRYgAikDICEXIAIpAyghGCACKQMwIRkgAikDOCEaIAIpA0AhGyACKQNIIRwgAikDUCEdIAIpA1ghHiACKQNgIR8gAikDaCEgIAIpA3AhISACKQN4ISJCASEzIAMgE34gEiAUfiARIBV+IBAgFn4gDyAXfiAOIBh+fHx8fCANIBl+IAwgGn4gCyAbfiAKIBx+fHx8fCAJIB1+IAggHn4gByAffiAGICB+fHx8fCAFICF+IAQgIn58fEImfnwgM3xC//8DfCI0QhCHITMgNCAzQoCABH59ISMgBCATfiADIBR+fCASIBV+IBEgFn4gECAXfiAPIBh+IA4gGX58fHx8IA0gGn4gDCAbfiALIBx+IAogHX58fHx8IAkgHn4gCCAffiAHICB+IAYgIX58fHx8IAUgIn58QiZ+fCAzfEL//wN8IjRCEIchMyA0IDNCgIAEfn0hJCAFIBN+IAQgFH4gAyAVfnx8IBIgFn4gESAXfiAQIBh+IA8gGX4gDiAafnx8fHwgDSAbfiAMIBx+IAsgHX4gCiAefnx8fHwgCSAffiAIICB+IAcgIX4gBiAifnx8fHxCJn58IDN8Qv//A3wiNEIQhyEzIDQgM0KAgAR+fSElIAYgE34gBSAUfiAEIBV+IAMgFn58fHwgEiAXfiARIBh+IBAgGX4gDyAafiAOIBt+fHx8fCANIBx+IAwgHX4gCyAefiAKIB9+fHx8fCAJICB+IAggIX4gByAifnx8fEImfnwgM3xC//8DfCI0QhCHITMgNCAzQoCABH59ISYgByATfiAGIBR+IAUgFX4gBCAWfiADIBd+fHx8fCASIBh+IBEgGX4gECAafiAPIBt+IA4gHH58fHx8IA0gHX4gDCAefiALIB9+IAogIH58fHx8IAkgIX4gCCAifnx8QiZ+fCAzfEL//wN8IjRCEIchMyA0IDNCgIAEfn0hJyAIIBN+IAcgFH4gBiAVfiAFIBZ+IAQgF34gAyAYfnx8fHx8IBIgGX4gESAafiAQIBt+IA8gHH4gDiAdfnx8fHwgDSAefiAMIB9+IAsgIH4gCiAhfnx8fHwgCSAifnxCJn58IDN8Qv//A3wiNEIQhyEzIDQgM0KAgAR+fSEoIAkgE34gCCAUfiAHIBV+IAYgFn4gBSAXfiAEIBh+IAMgGX58fHx8fHwgEiAafiARIBt+IBAgHH4gDyAdfiAOIB5+fHx8fCANIB9+IAwgIH4gCyAhfiAKICJ+fHx8fEImfnwgM3xC//8DfCI0QhCHITMgNCAzQoCABH59ISkgCiATfiAJIBR+IAggFX4gByAWfiAGIBd+IAUgGH4gBCAZfiADIBp+fHx8fHx8fCASIBt+IBEgHH4gECAdfiAPIB5+IA4gH358fHx8IA0gIH4gDCAhfiALICJ+fHx8QiZ+fCAzfEL//wN8IjRCEIchMyA0IDNCgIAEfn0hKiALIBN+IAogFH4gCSAVfiAIIBZ+IAcgF358fHx8IAYgGH4gBSAZfiAEIBp+IAMgG358fHx8IBIgHH4gESAdfiAQIB5+IA8gH34gDiAgfnx8fHwgDSAhfiAMICJ+fHxCJn58IDN8Qv//A3wiNEIQhyEzIDQgM0KAgAR+fSErIAwgE34gCyAUfiAKIBV+IAkgFn4gCCAXfnx8fHwgByAYfiAGIBl+IAUgGn4gBCAbfnx8fHwgAyAcfnwgEiAdfiARIB5+IBAgH34gDyAgfiAOICF+fHx8fCANICJ+fEImfnwgM3xC//8DfCI0QhCHITMgNCAzQoCABH59ISwgDSATfiAMIBR+IAsgFX4gCiAWfiAJIBd+fHx8fCAIIBh+IAcgGX4gBiAafiAFIBt+fHx8fCAEIBx+IAMgHX58fCASIB5+IBEgH34gECAgfiAPICF+IA4gIn58fHx8QiZ+fCAzfEL//wN8IjRCEIchMyA0IDNCgIAEfn0hLSAOIBN+IA0gFH4gDCAVfiALIBZ+IAogF358fHx8IAkgGH4gCCAZfiAHIBp+IAYgG358fHx8IAUgHH4gBCAdfiADIB5+fHx8IBIgH34gESAgfiAQICF+IA8gIn58fHxCJn58IDN8Qv//A3wiNEIQhyEzIDQgM0KAgAR+fSEuIA8gE34gDiAUfiANIBV+IAwgFn4gCyAXfnx8fHwgCiAYfiAJIBl+IAggGn4gByAbfnx8fHwgBiAcfiAFIB1+IAQgHn4gAyAffnx8fHwgEiAgfiARICF+IBAgIn58fEImfnwgM3xC//8DfCI0QhCHITMgNCAzQoCABH59IS8gECATfiAPIBR+IA4gFX4gDSAWfiAMIBd+fHx8fCALIBh+IAogGX4gCSAafiAIIBt+fHx8fCAHIBx+IAYgHX4gBSAefiAEIB9+fHx8fCADICB+fCASICF+IBEgIn58QiZ+fCAzfEL//wN8IjRCEIchMyA0IDNCgIAEfn0hMCARIBN+IBAgFH4gDyAVfiAOIBZ+IA0gF358fHx8IAwgGH4gCyAZfiAKIBp+IAkgG358fHx8IAggHH4gByAdfiAGIB5+IAUgH358fHx8IAQgIH4gAyAhfnx8IBIgIn5CJn58IDN8Qv//A3wiNEIQhyEzIDQgM0KAgAR+fSExIBIgE34gESAUfiAQIBV+IA8gFn4gDiAXfnx8fHwgDSAYfiAMIBl+IAsgGn4gCiAbfnx8fHwgCSAcfiAIIB1+IAcgHn4gBiAffnx8fHwgBSAgfiAEICF+IAMgIn58fHwgM3xC//8DfCI0QhCHITMgNCAzQoCABH59ITIgIyAzQgF9IDNCAX1CJX58fCEjQgEhMyAjIDN8Qv//A3wiNEIQhyEzIDQgM0KAgAR+fSEjICQgM3xC//8DfCI0QhCHITMgACA0IDNCgIAEfn03AwggJSAzfEL//wN8IjRCEIchMyAAIDQgM0KAgAR+fTcDECAmIDN8Qv//A3wiNEIQhyEzIAAgNCAzQoCABH59NwMYICcgM3xC//8DfCI0QhCHITMgACA0IDNCgIAEfn03AyAgKCAzfEL//wN8IjRCEIchMyAAIDQgM0KAgAR+fTcDKCApIDN8Qv//A3wiNEIQhyEzIAAgNCAzQoCABH59NwMwICogM3xC//8DfCI0QhCHITMgACA0IDNCgIAEfn03AzggKyAzfEL//wN8IjRCEIchMyAAIDQgM0KAgAR+fTcDQCAsIDN8Qv//A3wiNEIQhyEzIAAgNCAzQoCABH59NwNIIC0gM3xC//8DfCI0QhCHITMgACA0IDNCgIAEfn03A1AgLiAzfEL//wN8IjRCEIchMyAAIDQgM0KAgAR+fTcDWCAvIDN8Qv//A3wiNEIQhyEzIAAgNCAzQoCABH59NwNgIDAgM3xC//8DfCI0QhCHITMgACA0IDNCgIAEfn03A2ggMSAzfEL//wN8IjRCEIchMyAAIDQgM0KAgAR+fTcDcCAyIDN8Qv//A3wiNEIQhyEzIAAgNCAzQoCABH59NwN4IAAgIyAzQgF9IDNCAX1CJX58fDcDAAuMBQEEfkIAIAKtfSEDIAApAwAiBSABKQMAIgaFIAODIQQgACAFIASFNwMAIAEgBiAEhTcDACAAKQMIIgUgASkDCCIGhSADgyEEIAAgBSAEhTcDCCABIAYgBIU3AwggACkDECIFIAEpAxAiBoUgA4MhBCAAIAUgBIU3AxAgASAGIASFNwMQIAApAxgiBSABKQMYIgaFIAODIQQgACAFIASFNwMYIAEgBiAEhTcDGCAAKQMgIgUgASkDICIGhSADgyEEIAAgBSAEhTcDICABIAYgBIU3AyAgACkDKCIFIAEpAygiBoUgA4MhBCAAIAUgBIU3AyggASAGIASFNwMoIAApAzAiBSABKQMwIgaFIAODIQQgACAFIASFNwMwIAEgBiAEhTcDMCAAKQM4IgUgASkDOCIGhSADgyEEIAAgBSAEhTcDOCABIAYgBIU3AzggACkDQCIFIAEpA0AiBoUgA4MhBCAAIAUgBIU3A0AgASAGIASFNwNAIAApA0giBSABKQNIIgaFIAODIQQgACAFIASFNwNIIAEgBiAEhTcDSCAAKQNQIgUgASkDUCIGhSADgyEEIAAgBSAEhTcDUCABIAYgBIU3A1AgACkDWCIFIAEpA1giBoUgA4MhBCAAIAUgBIU3A1ggASAGIASFNwNYIAApA2AiBSABKQNgIgaFIAODIQQgACAFIASFNwNgIAEgBiAEhTcDYCAAKQNoIgUgASkDaCIGhSADgyEEIAAgBSAEhTcDaCABIAYgBIU3A2ggACkDcCIFIAEpA3AiBoUgA4MhBCAAIAUgBIU3A3AgASAGIASFNwNwIAApA3giBSABKQN4IgaFIAODIQQgACAFIASFNwN4IAEgBiAEhTcDeAtFAQF/QQAhAgNAIAAgAkECdGogASACajEAACABIAJqMQABQgiGfDcDAEEgIAJBAmoiAkcNAAsgACAAKQN4Qv//AYM3A3gLKAECf0HAABARIQIgAkEgaiEDIAIgABAxIAMgARAxIAJBACADQQAQMAtFAQJ/QQAhBEEAIQUDQCAAIAEgBWpqLQAAIAIgAyAFamotAABzIARyIQRBICAFQQFqIgVHDQALIARBAWtBCHZBAXFBAWsLhAICBX8BfkGAAhARIQUgBUGAAWohBiAGIAEQMyAGECsgBhArIAYQK0EAIQMDQCAFIAYpAwBC7f8DfSIHNwMAIAUgB0L//wODNwMAQQghAgNAIAUgAmogBiACaikDAEL//wN9IAdCEIdCAYN9IgdC//8DgzcDAEH4ACACQQhqIgJHDQALIAUgAmogBiACaikDAEL//wF9IAdCEIdCAYN9Igc3AwAgB0IQh0IBg6chBCAGIAVBASAEaxAtQQIgA0EBaiIDRw0AC0EAIQIDQCAGIAJBAnRqKQMAIQcgACACaiAHQv8BgzwAACAAIAJBAWpqIAdCCIc8AABBICACQQJqIgJHDQALCxYBAX9BIBARIgEgABAxIAEtAABBAXELKAEBf0EAIQIDQCAAIAJqIAEgAmopAwA3AwBBgAEgAkEIaiICRw0ACwttAQJ/QYABEBEiAyABEDNB/QEhAgNAIAMgAxAqIAMgAyABECxBBCACQQFrIgJHDQALIAMgAxAqIAMgAxAqIAMgAyABECwgAyADECogAyADECogAyADIAEQLCADIAMQKiADIAMgARAsIAAgAxAzC0IBAX9BgAQQESECIAIjDRAzIAJBgAFqIw4QMyACQYACakGAARAlIAJBAToAgAIgAkGAA2ojDSMOECwgACACIAEQNgthAQJ/IABBgAQQJSAAQQE6AIABIABBAToAgAJB/wEhAwNAIAIgA0EDdmotAAAgA0EHcXVBAXEhBCAAIAEgBBA4IAEgABA3IAAgABA3IAAgASAEEDhBfyADQQFrIgNHDQALC4cCAQl/QYAJEBEhAiACQYABaiEDIANBgAFqIQQgBEGAAWohBSAFQYABaiEGIAZBgAFqIQcgB0GAAWohCCAIQYABaiEJIAlBgAFqIQogAiAAQYABaiAAECkgCiABQYABaiABECkgAiACIAoQLCADIAAgAEGAAWoQKCAKIAEgAUGAAWoQKCADIAMgChAsIAQgAEGAA2ogAUGAA2oQLCAEIAQjDBAsIAUgAEGAAmogAUGAAmoQLCAFIAUgBRAoIAYgAyACECkgByAFIAQQKSAIIAUgBBAoIAkgAyACECggACAGIAcQLCAAQYABaiAJIAgQLCAAQYACaiAIIAcQLCAAQYADaiAGIAkQLAsnAQF/QQAhAwNAIAAgA2ogASADaiACEC1BgAQgA0GAAWoiA0cNAAsLUQEDf0GADBARIQIgAkGABGohAyADQYAEaiEEIAQgAUGAAmoQNCACIAEgBBAsIAMgAUGAAWogBBAsIAAgAxAxIAAgAC0AHyACEDJBB3RzOgAfC6sCAQd/QYAHECQhAiACQYABaiEDIANBgAFqIQQgBEGAAWohBSAFQYABaiEGIAZBgAFqIQcgB0GAAWohCCAAQgE8AIACIABBgAFqIAEQLiAEIABBgAFqECogBSAEIwsQLCAEIAQgAEGAAmoQKSAFIABBgAJqIAUQKCAGIAUQKiAHIAYQKiAIIAcgBhAsIAIgCCAEECwgAiACIAUQLCACIAIQOyACIAIgBBAsIAIgAiAFECwgAiACIAUQLCAAIAIgBRAsIAMgABAqIAMgAyAFECwgAyAEEC8EQCAAIAAjDxAsCyADIAAQKiADIAMgBRAsIAMgBBAvBEBBfw8LIAJBgAEQJSAAEDIgAS0AH0EHdUYEQCAAIAIgABApCyAAQYADaiAAIABBgAFqECxBAAtNAQJ/QYABEBEhAiACIAEQM0H6ASEDA0AgAiACECogAiACIAEQLEEBIANBAWsiA0cNAAsgAiACECogAiACECogAiACIAEQLCAAIAIQMwv0AgMBfgN/An5B+AMhAwNAQgAhAiABIANqKQMAIQYgA0GAAmshBCADQeAAayEFA0AgASAEaikDACIHIAJCECAGfiAEIANrQYACaiMQaikDAH59fCIHQoABfEIIhyECIAcgAkKAAn59IQcgASAEaiAHNwMAIAUgBEEIaiIERw0ACyABIARqIAEgBGopAwAgAnw3AwAgASADakIANwMAQfgBIANBCGsiA0cNAAtCACECIAEpA/gBQgSHIQZBACEEA0AgASAEaikDACIHIAIgBiMQIARqKQMAfn18IgdCCIchAiAHQv8BgyEHIAEgBGogBzcDAEGAAiAEQQhqIgRHDQALQQAhBANAIAEgBGogASAEaikDACACIxAgBGopAwB+fTcDAEGAAiAEQQhqIgRHDQALQQAhAwNAIAEgA2opAwAhBiABIANqIAEgA2opAwggBkIIh3w3AwggACADQQN2aiAGQv8BgzwAAEGAAiADQQhqIgNHDQALCyAAIAAQEyABEBMgAUEgEBgQAUECIAAQFSABEBUQIhAaC1oBAn8gARASIQRBwAAgBGoQESEDQSAgA2pBICAAakEgECZBwAAgA2ogASAEECYgABATIAMQEyABEBRBICADakEgIARqEBgQAUEDIAIQFSAAEBUgAxAVECMQGgtxAQN/QYAEECQhBCAEIABBwAAQJyAAIAQQPEGABBAkIQVBIBAkIQYgABATIAYQEyABEBQgAxAUIAUgABA1IAYgBRA5IAMgBkEgECZBICADakEgIAFqQSAQJiADEBcQAUEEIAAQFSACEBUgBhAVECMQGgvlAQMFfwF+An9BoAQQJCEKIApBgARqIQsgARAUIAIQFCADEBQgCiAAQcAAECcgACAKEDwgAiACLQAAQfgBcToAACACIAItAB9B/wBxQcAAcjoAHyAKIAFBIBAnIApBgAJqQYACECVBACEFIAohBwNAIAUgAGoxAAAhCUEAIQYgByEIA0AgCCAIKQMAIAkgBiACajEAAH58NwMAIAhBCGohCEEgQQEgBmoiBkcNAAsgB0EIaiEHQSBBASAFaiIFRw0ACyALIAoQPEHAABARIQQgBCADQSAQJkEgIARqIAtBIBAmIAQQFwtzAQJ/IAIQEkEgRwRAIxEQGRAACyABEBJBwABHBEAjEhAZEAALIAAQEiEDQcAAIANqEBEhBCAEIAFBIBAmIARBIGogAkEgECYgBEHAAGogACADECYgBBAXEAFBACABQSAQGCABQSBqQSAQGCACEBcQIxAaC2cBBH9BoAgQJCEEIARBIGohBSAFQYAEaiEGIAYgAxA6BEBBABAWDwsgBSAAQcAAECcgACAFEDwgBSAGIAAQNiAGIAIQNSAFIAYQNyAEIAUQOSABQQAgBEEAEDAEQEEAEBYPC0EBEBYLCABBIBACEEULLgAgABASQcAARwRAIxEQGRAAC0ECEB0jFRAeIAAQFxojFBAeIABBIGpBIBAYGgskAQF/IAAQEkEgRwRAIxMQGRAACyAAEBciARABQQEgARAhEBoLOgECfyAAEEchA0HAABARIQIgAiABQSAQJiACQSBqIANBIBAmQQIQHSMVEB4gAhAXGiMUEB4gAxAXGgs/AQJ/IAAgAC0AAEH4AXE6AAAgACAALQAfQf8AcUHAAHI6AB9BgAQQJCECQSAQJCEBIAIgABA1IAEgAhA5IAELC5kICwBBAAuAAaN4AAAAAAAAWRMAAAAAAADKTQAAAAAAAOt1AAAAAAAAq9gAAAAAAABBQQAAAAAAAE0KAAAAAAAAcAAAAAAAAACY6AAAAAAAAHl3AAAAAAAAeUAAAAAAAADHjAAAAAAAAHP+AAAAAAAAbysAAAAAAADubAAAAAAAAANSAAAAAAAAAEGAAQuAAVnxAAAAAAAAsiYAAAAAAACUmwAAAAAAANbrAAAAAAAAVrEAAAAAAACDggAAAAAAAJoUAAAAAAAA4AAAAAAAAAAw0QAAAAAAAPPuAAAAAAAA8oAAAAAAAACOGQAAAAAAAOf8AAAAAAAA31YAAAAAAADc2QAAAAAAAAYkAAAAAAAAAEGAAguAARrVAAAAAAAAJY8AAAAAAABgLQAAAAAAAFbJAAAAAAAAsqcAAAAAAAAllQAAAAAAAGDHAAAAAAAALGkAAAAAAABc3AAAAAAAANb9AAAAAAAAMeIAAAAAAACkwAAAAAAAAP5TAAAAAAAAbs0AAAAAAADTNgAAAAAAAGkhAAAAAAAAAEGAAwuAAVhmAAAAAAAAZmYAAAAAAABmZgAAAAAAAGZmAAAAAAAAZmYAAAAAAABmZgAAAAAAAGZmAAAAAAAAZmYAAAAAAABmZgAAAAAAAGZmAAAAAAAAZmYAAAAAAABmZgAAAAAAAGZmAAAAAAAAZmYAAAAAAABmZgAAAAAAAGZmAAAAAAAAAEGABAuAAbCgAAAAAAAADkoAAAAAAAAnGwAAAAAAAO7EAAAAAAAAeOQAAAAAAAAvrQAAAAAAAAYYAAAAAAAAQy8AAAAAAACn1wAAAAAAAPs9AAAAAAAAmQAAAAAAAABNKwAAAAAAAAvfAAAAAAAAwU8AAAAAAACAJAAAAAAAAIMrAAAAAAAAAEGABQuAAu0AAAAAAAAA0wAAAAAAAAD1AAAAAAAAAFwAAAAAAAAAGgAAAAAAAABjAAAAAAAAABIAAAAAAAAAWAAAAAAAAADWAAAAAAAAAJwAAAAAAAAA9wAAAAAAAACiAAAAAAAAAN4AAAAAAAAA+QAAAAAAAADeAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAQYAHCxAMAAAAYmFkIGtleSBzaXplAEGQBwsWEgAAAGJhZCBzaWduYXR1cmUgc2l6ZQBBpgcLEQ0AAABiYWQgc2VlZCBzaXplAEG3BwsNCQAAAHB1YmxpY0tleQBBxAcLDQkAAABzZWNyZXRLZXk=";
var { sign, verify, newKeyPair, keyPairFromSecretKey, keyPairFromSeed, table, memory, alloc, reset } = wrap(wasm, ["sign#lift", "verify#lift", "newKeyPair#lift", "keyPairFromSecretKey#lift", "keyPairFromSeed#lift", "table", "memory", "alloc", "reset"], { "#crypto": { "hashNative#lift": hashNative, "randomBytes": randomBytes }, "watever-js-wrapper": { "addLock": addLock, "removeLock": removeLock }, "js": { "s => {throw Error(s);}#lift": "s => {throw Error(s);}", "(p, c, ...args) => p.then(x => c(x, ...args))#lift": "(p, c, ...args) => p.then(x => c(x, ...args))", "console.log": "console.log" } });
export {
  alloc,
  keyPairFromSecretKey,
  keyPairFromSeed,
  memory,
  newKeyPair,
  reset,
  sign,
  table,
  verify
};

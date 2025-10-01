import Menu from "../componentes/Menu";

import AtendimentoPainel from "../componentes/AtendimentoPainel";

import { UserCheck } from "@phosphor-icons/react";

function Atendimento() {
  return (
    <div>
      <div className="flex justify-start">
        <UserCheck size={32} weight="fill" className="pr-2" />
        <h1>Atendimento</h1>
      </div>

      <Menu />
      <AtendimentoPainel />
    </div>
  );
}

export default Atendimento;

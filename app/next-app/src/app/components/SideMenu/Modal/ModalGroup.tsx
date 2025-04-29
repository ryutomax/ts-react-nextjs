import { useContext } from "react";
import { ModalGroupCtxtType } from '@/app/modules/types/types';
import { ModalGroupCtxt } from "@/app/modules/hooks/context";
import ModalUpdateGroup from '@/app/components/SideMenu/Modal/ModalUpdateGroup'
import ModalDeleteGroup from '@/app/components/SideMenu/Modal/ModalDeleteGroup'
import ModalSelectGroup from '@/app/components/SideMenu/Modal/ModalSelectGroup'

export default function ModalGroup(){
  const MGC: ModalGroupCtxtType = useContext(ModalGroupCtxt);

  return(
    <>
      {MGC.targetSelectGroup && (
        <ModalSelectGroup />
      )}
      {MGC.targetUpdateGroup && (
        <ModalUpdateGroup
          targetGroupName={MGC.targetUpdateGroup.name}
          targetGroupId={MGC.targetUpdateGroup.id}
        />
      )}
      {MGC.targetDeleteGroup && (
        <ModalDeleteGroup 
          group={MGC.targetDeleteGroup}
          targetGroupName={MGC.targetDeleteGroup.name}
          targetGroupId={MGC.targetDeleteGroup.id}
        />
      )}
    </>
  );
}
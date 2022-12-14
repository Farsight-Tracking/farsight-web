import {
  Button,
  Card,
  CardContent,
  Dialog,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useContext, useState } from "react";
import { getChainNameByChainId, getLogoNameByChainId } from "../../utils/ChainTranslation";
import { AuthContext } from "../../contexts/auth-context";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import LockIcon from "@mui/icons-material/Lock";
import { mainChainId } from "../../utils/chain-ids";
import { ChainState, Registration } from "../../utils/HinterEnde";
import { BridgeNFTModal } from "./modals/bridge-nft-modal";

interface ChainContentProps {
  registration: Registration;
  keeperChainId: number | null;
  canEdit: boolean;
  chainState: ChainState;
  name: string;
}

export const ChainContent = ({ registration, keeperChainId, chainState, canEdit, name }: ChainContentProps) => {
  const { chainId: connectedChainId, address } = useContext(AuthContext);

  //modal
  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [openSetValue, setOpensetValue] = useState(false);
  const handleOpensetValue = () => setOpensetValue(true);
  const handleClosesetValue = () => setOpensetValue(false);
  const changeLocalOwner = () => {}; //ToDo: machmal
  const changeToMainChain = () => {}; //ToDo: machmal
  const setValue = () => {}; //ToDo: machmal

  const { chainId, expiration, localOwner, isKeeper, ownerChangeVersion, registrationVersion } =
    chainState;

  const isExpired = expiration <= new Date().getTime() / 1000;
  const basepath = "/static/images/chainlogos/";

  return (
    <Card
      sx={isExpired ? { backgroundColor: "gray" } : null}
      style={
        chainId === connectedChainId
          ? { outline: "0.3rem solid #5048e5" }
          : { outline: "0.1rem solid #5048e5" }
      }
    >
      <CardContent>
        <Grid container spacing={0.5}>
          <Grid
            xs={3}
            style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}
          >
            <img src={basepath + getLogoNameByChainId(chainId)} width="50" height="50" />
          </Grid>
          <Grid xs={9} style={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography color="textPrimary" gutterBottom variant="h5">
              {getChainNameByChainId(chainId)}
            </Typography>
          </Grid>
          <Grid xs={12} />
          {!isExpired && (
            <Grid xs={12}>
              <Box>
                <Typography color="textPrimary" gutterBottom variant="h5">
                  LocalOwner: {localOwner.slice(0, 7) + "..." + localOwner.slice(21, 28)}
                </Typography>
              </Box>
              <Typography color="textPrimary" gutterBottom variant="h6">
                ExpiresAt: {new Date(Number(expiration * 1000)).toLocaleString()}
              </Typography>
              <Typography color="textPrimary" gutterBottom variant="h6">
                Version: {registrationVersion}.{ownerChangeVersion}
              </Typography>
            </Grid>
          )}
          {!isExpired && (
            <>
              <Grid xs={6} sm={6} md={6} style={{ display: "flex", justifyContent: "flex-start" }}>
                {canEdit &&<Tooltip
                  title={
                    connectedChainId === null
                      ? "please connect your wallet"
                      : chainId !== connectedChainId
                      ? "you are connected to another chain"
                      : "Here you can send your NFT to another supported Chain"
                  }
                >
                   <span>
                    <Button
                      disabled={chainId !== connectedChainId}
                      variant="contained"
                      onClick={() => setOpen2(true)}
                    >
                      Cross Chain Transfer
                    </Button>
                  </span>
                </Tooltip>}
                {keeperChainId !== null && <Dialog
                  open={open2}
                  onClose={handleClose2}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <BridgeNFTModal registration={registration} name={name} keeperChainId={keeperChainId}></BridgeNFTModal>
                </Dialog>}
              </Grid>
              <Grid xs={6} sm={6} md={6} style={{ display: "flex", justifyContent: "flex-end" }}>
                {canEdit &&<Tooltip
                  title={
                    connectedChainId === null
                      ? "please connect your wallet"
                      : chainId !== connectedChainId
                      ? "you are connected to another chain"
                      : "here you can invalidate previous owners records on all chains"
                  }
                >
                   <span>
                    <Button
                      disabled={chainId !== connectedChainId}
                      variant="contained"
                      onClick={handleOpen1}
                    >
                      Increment Owner Version
                    </Button>
                  </span>
                </Tooltip>}
                <Dialog
                  open={open1}
                  onClose={handleClose1}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <span></span>
                </Dialog>
              </Grid>
            </>
          )}
        </Grid>
        {isExpired && <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
          <LockIcon fontSize={"large"} sx={{ ml: 1 }} />
          <p>Uninitialized or Expired</p>
          {canEdit && <Tooltip
            title={
              connectedChainId === null
                ? "Please connect your wallet"
                : mainChainId !== connectedChainId
                  ? "You need to connect to your NFT chain"
                  : "Here you can set records cross chain"
            }
          >
            <span>
              <Button
                disabled={mainChainId !== connectedChainId}
                variant="contained"
                onClick={handleOpen1}
              >
                Set Record
              </Button>
            </span>
          </Tooltip>}
        </div>}

      </CardContent>
    </Card>
  );
};

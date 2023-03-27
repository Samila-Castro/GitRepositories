import { useState } from "react";
import { Card } from "./components/Card/Card";
import { Header } from "./components/Header/Header";
import { api } from "./services/api";
import { IconButton, InputBase, TextField } from "@mui/material";

import Repositorios from "../assets/repositorios.svg";
import Followers from "../assets/followers.svg";
import Following from "../assets/following.svg";
import SearchIcon from "@material-ui/icons/Search";
import "./App.css";

interface User {
  avatar_url: string;
  bio: string;
  login: string;
  name: string;
  followers: number;
  following: number;
  public_repos: number;
}

interface Detail {
  name: string;
  description: string;
  subdescription: string;
  avatar?: string;
  action: () => void;
}

function App() {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string>("");
  const [details, setDetails] = useState<Detail[]>([]);
  const [input, setInput] = useState<string>("");
  const [theme, setTheme] = useState<string>("theme-white");

  const handleTheme = (value: boolean) => {
    if (value) setTheme("theme-dark");
    else {
      setTheme("theme-white");
    }
  };

  const handleClickedProject = (url: string) => {
    window.location.assign(url);
  };
  const handleInputText = (name: string) => {
    setInput(name);
  };

  const handleUserRequest = (userName: string) => {
    api
      .get(`/users/${userName}`)
      .then((response) => {
        setUser(response.data);
        setError("");
      })
      .catch((err) => {
        setError("Usuário não existe");
      });

    api
      .get(`https://api.github.com/users/${userName}/repos`)
      .then((response) => {
        const details = response.data.map((data: any) => {
          return {
            name: data.name,
            description: data.description,
            subdescription: "",
            action: () => handleClickedProject(data.html_url),
          };
        });
        setDetails(details);
      })
      .catch((err) => {
        console.log("Ops! Ocorreu um erro!");
      });
  };

  const handleRepositoryRequest = (userName: string) => {
    api
      .get(`https://api.github.com/users/${userName}/repos`)
      .then((response) => {
        const details = response.data.map((data: any) => {
          return {
            name: data.name,
            description: data.description,
            subdescription: "",
            action: () => handleClickedProject(data.html_url),
          };
        });
        setDetails(details);
      })
      .catch((err) => {
        console.log("Ops! Ocorreu um erro!");
      });
  };

  const handleFollowersRequest = (userName: string) => {
    api
      .get(`https://api.github.com/users/${userName}/followers`)
      .then((response) => {
        const details = response.data.map((data: any) => {
          return {
            name: data.name,
            description: data.login,
            subdescription: "",
            avatar: data.avatar_url,
            action: () => handleUserRequest(data.login),
          };
        });
        setDetails(details);
      })
      .catch((err) => {
        console.log("Ops! Ocorreu um erro!");
      });
  };

  const handleFollowingRequest = (userName: string) => {
    api
      .get(`https://api.github.com/users/${userName}/following`)
      .then((response) => {
        const details = response.data.map((data: any) => {
          return {
            name: data.name,
            description: data.login,
            subdescription: "",
            avatar: data.avatar_url,
            action: () => handleUserRequest(data.login),
          };
        });
        setDetails(details);
      })
      .catch((err) => {
        console.log("Ops! Ocorreu um erro!");
      });
  };

  return (
    <div className={theme}>
      <Header toggletheme={handleTheme} />
      <section className="inputWrapper">
        <TextField
          error={!!error}
          placeholder="User name"
          helperText={error}
          onChange={(e) => handleInputText(e.target.value)}
          size="medium"
          value={input}
          className={theme === "theme-dark" ? "inputDark" : "inputWhite"}
          sx={{
            borderRadius: "8px",
            width: "30rem",
          }}
        />
        <IconButton
          type="submit"
          sx={{ p: "10px" }}
          aria-label="search"
          color="primary"
          onClick={() => handleUserRequest(input)}
        >
          <SearchIcon />
        </IconButton>
      </section>

      <div className="userInfoWrapper">
        {!!user && (
          <div className="userInfo">
            <div className="profile">
              <img src={`https://github.com/${user?.login}.png`} alt="" />
              <a href={`https://github.com/${user.login}`} target="_blank">
                {user?.name}
              </a>
              <span>{user?.bio}</span>
            </div>
            <div className="statistics">
              <div
                className="stats"
                onClick={() => handleRepositoryRequest(user.login)}
              >
                <img src={Repositorios} alt="icone de estrela" />
                <div className="info">
                  <p>Repositórios</p>
                  <h5>{user.public_repos}</h5>
                </div>
              </div>
              <div
                className="stats"
                onClick={() => handleFollowersRequest(user.login)}
              >
                <img src={Followers} alt="icone de pessoas" />
                <div className="info">
                  <p>Followers</p>
                  <h5>{user?.followers}</h5>
                </div>
              </div>
              <div
                className="stats"
                onClick={() => handleFollowingRequest(user.login)}
              >
                <img src={Following} alt="icone de pessoas" />
                <div className="info">
                  <p>Following</p>
                  <h5>{user?.following}</h5>
                </div>
              </div>
            </div>
          </div>
        )}
        {!!details.length && <Card details={details} />}
      </div>
    </div>
  );
}

export default App;

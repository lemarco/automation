#!/bin/bash

PROMPT_COMMAND='PS1_CMD1=$(git branch 2>/dev/null | grep '"'"'*'"'"' | colrm 1 2)'; PS1='\[\e[2m\]\d\[\e[0m\]|\[\e[2m\]\t\[\e[0m\]| git:${PS1_CMD1}| dir:\W\[\e[5m\]:\[\e[0m\] '
executable="bun"
if ! command -v "$executable" &>/dev/null; then
    echo "Executable 'bun' not found. Do you want to install it? (y/n)"
    read -r install_choice
    if [[ $install_choice =~ ^[Yy]$ ]]; then
        echo "Installing 'bun'..."
        # Run the installation command using curl
        curl -fsSL https://bun.sh/install | bash
    fi
fi

export BUN_INSTALL="$HOME/.bun"
export PATH=$BUN_INSTALL/bin:$PATH
export VOLTA_HOME="$HOME/.volta"
export PATH="$VOLTA_HOME/bin:$PATH"
. "$HOME/.cargo/env"


alias ll="ls -lahs"
alias h='hx ${1}'
alias c='clear'
alias dps='bun  ~/.config/automation/auto.ts docker ps'
alias dkill='bun  ~/.config/automation/auto.ts docker kill ${1}'
alias dres='bun  ~/.config/automation/auto.ts docker restart ${1}'
alias get='bun  ~/.config/automation/auto.ts get ${1}'
alias post='bun  ~/.config/automation/auto.ts post ${1} ${2} ${3}'
alias put='bun  ~/.config/automation/auto.ts put ${1} ${2} ${3}'
alias delete='bun  ~/.config/automation/auto.ts delete ${1} ${2} ${3}'

FROM ubuntu:xenial

# This dockerfile basically follows the instructions in
# https://developer.holochain.org/start.html
# as of march 2019

# Install dependencies
RUN apt update

# Install dependencies
RUN apt install -y sudo git nodejs npm wget unzip libzmq3-dev curl
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y --default-toolchain nightly-2019-01-24
ENV PATH "/root/.cargo/bin:${PATH}"

RUN rustup target add wasm32-unknown-unknown

# Install holochain
# use my fork until this is merged: https://github.com/holochain/holochain-rust/pull/1062
RUN git clone https://github.com/nmaro/holochain-rust
RUN chmod +x holochain-rust/scripts/install/auto.sh
RUN cd holochain-rust && scripts/install/auto.sh


# Install Development Tools
RUN wget https://github.com/holochain/n3h/archive/v0.0.4-alpha1.zip
RUN unzip v0.0.4-alpha1.zip
RUN cd n3h-0.0.4-alpha1 && npm i
# RUN cd n3h-0.0.4-alpha1 && npm run bootstrap
RUN wget https://github.com/holochain/holochain-rust/releases/download/v0.0.4-alpha/cli-v0.0.4-alpha-x86_64-ubuntu.tar.gz
RUN tar xvf cli-v0.0.4-alpha-x86_64-ubuntu.tar.gz
RUN mv cli-v0.0.4-alpha-x86_64-unknown-linux-gnu/hc /bin

WORKDIR /app

COPY . ./

RUN hc package

# Install Production Tools
#RUN wget https://github.com/holochain/holochain-rust/releases/download/v0.0.4-alpha/conductor-v0.0.4-alpha-x86_64-ubuntu.tar.gz
#RUN tar xvf conductor-v0.0.4-alpha-x86_64-ubuntu.tar.gz
#RUN mv conductor-v0.0.4-alpha-x86_64-ubuntu.tar.gz holochain

# For now we use the testing tool
ENTRYPOINT [ "hc" ]
CMD [ "run", "-p", "8010", "--persist" ]

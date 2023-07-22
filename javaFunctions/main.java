import com.hedera.hashgraph.sdk.AccountId;
import com.hedera.hashgraph.sdk.Client;
import com.hedera.hashgraph.sdk.PrivateKey;
import io.github.cdimascio.dotenv.Dotenv;
import com.hedera.hashgraph.sdk.HederaPreCheckStatusException;
import com.hedera.hashgraph.sdk.HederaReceiptStatusException;
import com.hedera.hashgraph.sdk.TransactionResponse;
import com.hedera.hashgraph.sdk.TransferTransaction;
import com.hedera.hashgraph.sdk.PublicKey;
import com.hedera.hashgraph.sdk.AccountCreateTransaction;
import com.hedera.hashgraph.sdk.Hbar;
import com.hedera.hashgraph.sdk.AccountBalanceQuery;
import com.hedera.hashgraph.sdk.AccountBalance;
import java.util.concurrent.TimeoutException;

public class main{
    public static void main(String[] args){
        System.out.println("Hello World");
        //Create the transaction
FileCreateTransaction transaction = new FileCreateTransaction()
    .setKeys(fileKey) 
    .setContents(fileContents);
        
//Change the default max transaction fee to 2 hbars
FileCreateTransaction modifyMaxTransactionFee = transaction.setMaxTransactionFee(new Hbar(2)); 

//Prepare transaction for signing, sign with the key on the file, sign with the client operator key and submit to a Hedera network
TransactionResponse txResponse = modifyMaxTransactionFee.freezeWith(client).sign(fileKey).execute(client);

//Request the receipt
TransactionReceipt receipt = txResponse.getReceipt(client);

//Get the file ID
FileId newFileId = receipt.fileId;

System.out.println("The new file ID is: " + newFileId);

//v2.0.0
    }
}
